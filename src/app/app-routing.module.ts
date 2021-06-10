import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BlogPageComponent} from "./pages/blog-page/blog-page.component";
import {PostPageComponent} from "./pages/post-page/post-page.component";
import {AddPageComponent} from "./pages/add-page/add-page.component";
import {UserGuard} from "./guards/user.guard";

const routes: Routes = [
  {
    path: '',
    component: BlogPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'post/:postID',
    component: PostPageComponent
  },
  {
    path: 'add',
    component: AddPageComponent,
    canActivate: [UserGuard]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
