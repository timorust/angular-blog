import {Component, OnDestroy, OnInit} from '@angular/core';
import {CoreService} from "../../services/core.service";
import {PostInterface} from "../../interfaces/post.interface";
import {ActivatedRoute} from "@angular/router";
import {CommentDocInterface, CommentInterface} from "../../interfaces/comment.interface";
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

  user;
  userSub;


  comments: CommentInterface[];
  commentsSub;

  commentForm: FormGroup;

  constructor(private coreService: CoreService,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private authS: AuthService) {

    this.postId = this.activatedRoute.snapshot.paramMap.get('postID');

  }

  ngOnInit(): void {
    this.getPost();
    this.getComments();
    this.buildForm();
    this.getUser();
  }

  ngOnDestroy() {
    if(this.userSub) this.userSub.unsubscribe();
    if(this.postSub) this.postSub.unsubscribe();
    if(this.commentsSub) this.commentsSub.unsubscribe();
  }

  getUser() {
    this.userSub = this.authS.user.subscribe(userDoc => {
      this.user = userDoc;
    })
  }

  getPost() {
    this.postSub = this.coreService.getPost(this.postId).subscribe((postDoc: PostInterface) => {
      this.post = postDoc;
    })
  }

  getComments() {
    this.commentsSub = this.coreService.getComments(this.postId).subscribe(async (commentsDoc: CommentDocInterface) => {
      if(commentsDoc === undefined) {
        await this.coreService.createCommentDocs(this.postId);
      }
      else {
        this.comments = commentsDoc.comments;
      }
      this.comments = commentsDoc.comments;
    });
  }


  buildForm() {
    this.commentForm = this.formBuilder.group({
      content: ['', [Validators.required, Validators.maxLength(200), Validators.minLength(5)]]
    });
  }

  get content() {return this.commentForm.get('content');}


  async sendComment() {
    if(!this.commentForm.valid) { return alert('Not valid!');}

    const commentRecord: CommentInterface = {

      uid: this.user.uid,
      comments: this.content.value,
      createdAt: Date.now(),
      displayName: this.user.displayName,
      title: this.content.value,
      photoURL: this.user.photoURL
    }
    await this.coreService.saveComment(this.postId, commentRecord);
    this.commentForm.reset();
  }

  async deleteComment() {
    if(!this.commentForm.valid) { return alert('Not valid');}
    await this.coreService.deleteComment(this.postId, this.content.value);
    alert('success delete');
  }

}
