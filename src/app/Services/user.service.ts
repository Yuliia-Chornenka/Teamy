import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IUser } from '../Models/user.model';
import { catchError } from 'rxjs/operators';
import { User } from '../Models/user';
import {T} from '@angular/cdk/keycodes';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = '/api/user';


  private handleError<T>(operation?: (err) => void, result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.status}`);
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) { }

  addUser(user: User): Observable<User> {
    return this.http.post<IUser>(`${this.baseUrl}/register`, user).pipe(
      catchError(this.handleError('Register user', user))
    );
  }

  imageUpload(imageForm: FormData): Observable<any> {
    return this.http.patch('/api/profile', imageForm);
  }

  getUserData(): Observable<IUser> {
    return this.http.get('/api/profile');
  }
}
