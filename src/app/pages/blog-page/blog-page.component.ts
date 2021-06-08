import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostInterface} from "../../interfaces/post.interface";
import {CoreService} from "../../services/core.service";
import {UserInterface} from "../../interfaces/user.interface";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'ab-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit, OnDestroy {


  blog: PostInterface[];
  blogSub;

  user: UserInterface;
  userSub;

  constructor(private coreService: CoreService,
              private authS: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authS.user.subscribe((user: UserInterface) => {
      this.user = user;
    });
    this.getBlog();
  }

  ngOnDestroy() {
    if(this.userSub) this.userSub.unsubscribe();
    if(this.blogSub) this.blogSub.unsubscribe();
  }

  getBlog() {
    this.blogSub = this.coreService.getBlog().subscribe((blog: PostInterface[]) => {
      this.blog = blog;
    })
  }

}
