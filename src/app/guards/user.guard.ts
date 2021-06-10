import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AngularFireAuth} from "@angular/fire/auth";


@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private router: Router,
              private afAuth: AngularFireAuth) {
  }
  async canActivate() {
    const user = await this.afAuth.currentUser;
    const isLoggedIn = !!user;
    if(isLoggedIn) {
      return true;
    }
    else {
      return this.router.navigateByUrl('/');
    }
  }

}
