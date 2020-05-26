import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IUser } from '../Models/user.model';
import {catchError, map} from 'rxjs/operators';
import { User } from '../Models/user';


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

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${window.localStorage.token}`,
    })
  };

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

  imageUpload(imageForm: FormData): Observable<any> {
    return this.http.patch('/api/profile', imageForm, this.httpOptions);
  }

  getUserData(): Observable<IUser> {
    return this.http.get('/api/profile', this.httpOptions);
  }
}
