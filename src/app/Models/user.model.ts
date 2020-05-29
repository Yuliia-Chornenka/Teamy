import { IProject } from './project';

export interface IUser {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
  photo?: string;
  projects?: {
    mentor: Array<IProject>,
    member: Array<IProject>
  };
  dates?: string;
}
