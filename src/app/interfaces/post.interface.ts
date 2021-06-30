import {CommentInterface} from "./comment.interface";

export interface PostInterface {
  userId: string;
  id?: number;
  published: boolean;
  title: string;
  score: number;
  body: string;
  comments: CommentInterface[];
  createdAt: any;
}
