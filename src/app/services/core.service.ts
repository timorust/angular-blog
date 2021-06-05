import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private httpClient: HttpClient) { }

  getBlogPosts() {
    return this.httpClient.get(`https://jsonplaceholder.typicode.com/posts`);
  }
}
