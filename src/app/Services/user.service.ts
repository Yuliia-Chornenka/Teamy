import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/user';
import { Observable, of } from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { IUser } from '../Models/user.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  baseUrl = '/api/user';

  private handleError<T>(operation: string = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) { }

  addUser(user: User): Observable<User> {
    return this.http
      .post<IUser>(`${this.baseUrl}/register`, user)
      .pipe(
        // map(res => {
        // return user;
        catchError(this.handleError('Register user', user))
      // })
    );
  }

  loginUser(loginData) {
    return this.http
      .post(`${this.baseUrl}/login`, loginData)
      .pipe(map(token => {
        return token;
    }));
  }
}
