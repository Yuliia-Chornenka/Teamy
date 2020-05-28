import { IUser } from './user.model';

export interface IMessage {
  text: string;
  user: IUser;
  date: number;
}
