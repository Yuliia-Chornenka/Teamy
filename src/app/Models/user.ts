import { IUser } from './user.model';

export class User implements IUser {
  // tslint:disable-next-line:variable-name
  public _id?: string;
  public name?: string;
  public email?: string;
  public password?: string;
  public photo?: string;

  // tslint:disable-next-line:variable-name
  constructor(_id: string, name: string, email: string, password: string, photo: string) {
    this._id = _id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.photo = photo;
  }
}
