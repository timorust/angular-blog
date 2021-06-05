import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BlogPageComponent} from "./pages/blog-page/blog-page.component";
import {PostPageComponent} from "./pages/post-page/post-page.component";

const routes: Routes = [
  {
    path: '',
    component: BlogPageComponent,
    pathMatch: 'full'
  },

  {
    path: 'post/:postId',
    component: PostPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
