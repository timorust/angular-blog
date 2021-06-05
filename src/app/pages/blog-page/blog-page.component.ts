import { Component, OnInit } from '@angular/core';
import {PostInterface} from "../../interfaces/post.interface";
import {CoreService} from "../../services/core.service";

@Component({
  selector: 'ab-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit {


  blogPosts: PostInterface[];
  constructor(private coreService: CoreService) { }

  ngOnInit(): void {
    this.getBlogPost();
  }
  getBlogPost() {
    this.coreService.getBlogPosts().subscribe((postItem: PostInterface[]) => {
      this.blogPosts = postItem;
    })
  }

}
