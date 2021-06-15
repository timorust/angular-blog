import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CommentInterface, CommentsDocInterface} from "../../interfaces/comment.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {CoreService} from "../../services/core.service";

@Component({
  selector: 'ab-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnDestroy {

  @Input() postId: string;

  user;
  userSub;

  comments: CommentInterface[];
  commentsSub;

  commentForm: FormGroup;

  constructor( private formBuilder: FormBuilder,
               private authS: AuthService,
               private coreService: CoreService) { }

  ngOnInit(): void {
    this.buildForm();
    this.getUser();
    this.getComments();
  }

  ngOnDestroy() {
    if(this.userSub) this.userSub.unsubscribe();
    if(this.commentsSub) this.commentsSub.unsubscribe();
  }

  getUser() {
    this.userSub = this.authS.user.subscribe(userDoc => {
      this.user = userDoc;
    })
  }

  getComments() {
    this.commentsSub = this.coreService.getComments(this.postId).subscribe(async (commentsDoc: CommentsDocInterface) => {
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
      comment: this.content.value,
      createdAt: Date.now(),
      displayName: this.user.displayName,
      photoURL: this.user.photoURL
    }
    await this.coreService.saveComment(this.postId, commentRecord);
    this.commentForm.reset();
  }

  async deleteComment(comment) {
    console.log(this.user.uid)
    console.log(comment.uid);

    if(this.user.uid !== comment.uid ) { return alert('Not commenter');}
    await this.coreService.deleteComment(this.postId, comment);
    alert('success delete');
  }

}
