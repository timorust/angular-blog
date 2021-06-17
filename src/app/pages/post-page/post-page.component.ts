import {Component, OnDestroy, OnInit} from '@angular/core';
import {CoreService} from "../../services/core.service";
import {PostInterface} from "../../interfaces/post.interface";
import {ActivatedRoute, Router} from "@angular/router";
import { CommentInterface, CommentsDocInterface} from "../../interfaces/comment.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {UserInterface} from "../../interfaces/user.interface";

@Component({
  selector: 'ab-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit, OnDestroy {

  postId: string

  post: PostInterface;
  postSub;

  user: UserInterface;
  userSub;

  constructor(private coreService: CoreService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {

    this.postId = this.activatedRoute.snapshot.paramMap.get('postID');
  }

  ngOnInit(): void {
    this.getPost();
    this.getUser();
  }


  getUser() {
    this.userSub = this.authService.user.subscribe((userDoc: UserInterface) => {
      this.user = userDoc;
    })
  }

  ngOnDestroy() {
    if(this.postSub) this.postSub.unsubscribe();
  }

  getPost() {
    this.postSub = this.coreService.getPost(this.postId).subscribe((postDoc: PostInterface) => {
      this.post = postDoc;
    })
  }

  removeThisPost() {
    this.coreService.removePostById(this.postId).then(async () => {
      alert('Delete Successfully!');
      await this.router.navigateByUrl('/');
    });
  }


  toggleVote() {
    this.coreService.togglePostScore(this.postId).then(() => {
      alert('Voted Successfully');
    })
  }
}
