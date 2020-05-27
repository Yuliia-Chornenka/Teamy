import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import { IUser } from '../Models/user.model';
import {catchError, map} from 'rxjs/operators';
import { User } from '../Models/user';
import {T} from '@angular/cdk/keycodes';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = '/api/user';

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${window.localStorage.token}`,
    })
  };

  private handleError<T>(operation?: (err) => void, result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }


  constructor(private http: HttpClient) { }

  addUser(user: User): Observable<User> {
    return this.http.post<IUser>(`${this.baseUrl}/register`, user);
  }

  imageUpload(imageForm: FormData): Observable<any> {
    return this.http.patch('/api/profile', imageForm, this.httpOptions);
  }

  getUserData(): Observable<IUser> {
    return this.http.get('/api/profile', this.httpOptions);
  }
}
