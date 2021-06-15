import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CoreService} from "../../services/core.service";
import {AuthService} from "../../services/auth.service";
import {UserInterface} from "../../interfaces/user.interface";

@Component({
  selector: 'ab-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit {

  addPostForm: FormGroup;

  user: UserInterface;
  userSub;

  constructor(private formBuilder: FormBuilder,
              private coreService: CoreService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.buildForm();
    this.getUser();
  }

  getUser() {
    this.userSub = this.authService.user.subscribe((userDoc: UserInterface) => {
      this.user = userDoc;
    })
  }

  buildForm() {
    this.addPostForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required, Validators.maxLength(500)]]
    })
  }

  saveNewPost() {
    if(this.addPostForm.invalid) {return alert('Invalid form');}
    this.coreService.savePost({
      userId: this.user.uid,
      title: this.getTitle.value,
      body: this.getBody.value,
      comments: [],
      score: this.getBody.value,
      createdAt: Date.now()
    }).then(() => {
      this.addPostForm.reset();
      alert('Successfully Saved');
    })
  }

  get getTitle() {
    return this.addPostForm.get('title');
  }

  get getBody() {
    return this.addPostForm.get('body');
  }
}
