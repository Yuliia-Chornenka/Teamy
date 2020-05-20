import { IUser } from './user.model';

export class User implements IUser {
  public _id?: string;
  public name?: string;
  public email?: string;
  public password?: string;

  constructor(_id: string, name: string, email: string, password: string) {
    this._id = _id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
