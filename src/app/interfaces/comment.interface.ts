export interface CommentsDocInterface {
  comments: CommentInterface[];
}

export interface CommentInterface {
  uid: string;
  displayName: string;
  createdAt: any;
  comment: string;
  photoURL: string;
}


