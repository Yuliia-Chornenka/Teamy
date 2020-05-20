import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from '../Models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AddUserService {

  baseUrl = 'https://xxx';

  constructor(private http: HttpClient) { }

  addUser(user: User): Observable<User> {
    return this.http
      .post<IUser>(`${this.baseUrl}/register`, user)
      .pipe(map(res => {
        return user;
      }));
  }
}