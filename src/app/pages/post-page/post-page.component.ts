import {Component, OnDestroy, OnInit} from '@angular/core';
import {CoreService} from "../../services/core.service";
import {PostInterface} from "../../interfaces/post.interface";
import {ActivatedRoute} from "@angular/router";
import { CommentInterface, CommentsDocInterface} from "../../interfaces/comment.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'ab-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit, OnDestroy {

  postId: string
  post: PostInterface;
  postSub;

  constructor(private coreService: CoreService,
              private activatedRoute: ActivatedRoute) {

    this.postId = this.activatedRoute.snapshot.paramMap.get('postID');
  }

  ngOnInit(): void {
    this.getPost();
  }

  ngOnDestroy() {
    if(this.postSub) this.postSub.unsubscribe();
  }

  getPost() {
    this.postSub = this.coreService.getPost(this.postId).subscribe((postDoc: PostInterface) => {
      this.post = postDoc;
    })
  }
}
