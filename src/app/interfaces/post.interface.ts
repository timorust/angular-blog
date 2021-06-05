import {CommentInterface} from "./comment.interface";

export interface PostInterface {
  userId: string;
  id: number;
  title: string;
  body: string;
  comment: CommentInterface[];
}