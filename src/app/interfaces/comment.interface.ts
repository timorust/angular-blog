export interface CommentDocInterface {
  comments: CommentInterface[];
}

export interface CommentInterface {
  uid: string;
  displayName: string;
  createdAt: any;
  title: string;
  comments: string;
  photoURL: string;
}


