import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from "../environments/environment"
import {AngularFireModule}  from '@angular/fire';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { CommentsComponent } from './components/comments/comments.component';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BlogPageComponent } from './pages/blog-page/blog-page.component';
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {HttpClientModule} from "@angular/common/http";
import { AddPageComponent } from './pages/add-page/add-page.component';





@NgModule({
  declarations: [
    AppComponent,
    PostPageComponent,
    CommentsComponent,
    BlogPageComponent,
    AddPageComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
