import { Component, OnInit } from '@angular/core';
import {PostInterface} from "../../interfaces/post.interface";
import {CoreService} from "../../services/core.service";
import {UserInterface} from "../../interfaces/user.interface";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'ab-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit {


  blogPosts: PostInterface[];

  user: UserInterface;
  userSub;
  constructor(private coreService: CoreService,
              private authS: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authS.user.subscribe((user: UserInterface) => {
      this.user = user;
      this.getBlogPost();
    });

  }

  getBlogPost() {
    this.coreService.getBlogPosts().subscribe((blogPosts: PostInterface[]) => {
      this.blogPosts = blogPosts;

      blogPosts.forEach(blogItem => {
        blogItem.userId = this.user.uid;
        this.coreService.copyData(blogItem).then(() => {

        })

      })
    })
  }

}
