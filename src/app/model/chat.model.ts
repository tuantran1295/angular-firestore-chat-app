import { User } from './user.model';

export class Chat {
  count: number;
  createdAt: number;
  id: string;
  messages: [{
    content: string,
    createdAt: string,
    uid: string
  }];
  uid: string;
  author?: User;
}
