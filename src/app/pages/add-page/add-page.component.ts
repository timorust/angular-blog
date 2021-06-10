import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'ab-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit {

  addPostForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.addPostForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required, Validators.maxLength(500)]]
    })
  }

  get getTitle() {
    return this.addPostForm.get('title');
  }

  get getBody() {
    return this.addPostForm.get('body');
  }

  saveNewPost() {

  }
}
