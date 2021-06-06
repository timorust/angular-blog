import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AngularFirestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private httpClient: HttpClient,
              private anf: AngularFirestore) { }

  getBlogPosts() {
    return this.httpClient.get(`https://jsonplaceholder.typicode.com/posts`);
  }
  copyData(blogItem) {
    return this.anf.doc(`posts/${blogItem.id}`).set({...blogItem});
  }
}
