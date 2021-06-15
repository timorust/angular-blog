import {CommentInterface} from "./comment.interface";

export interface PostInterface {
  userId: string;
  id?: number;
  title: string;
  score: number;
  body: string;
  comments: CommentInterface[];
  createdAt: number;
}
