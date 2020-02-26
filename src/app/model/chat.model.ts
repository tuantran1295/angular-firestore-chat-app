import { User } from './user.model';

export class Chat {
  count: number;
  createdAt: number;
  messages: {
    content: string,
    createdAt: string,
    uid: string
  };
  uid: string;
  author: User;
}
