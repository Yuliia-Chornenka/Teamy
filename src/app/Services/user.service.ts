import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IUser } from '../Models/user.model';
import { catchError, map } from 'rxjs/operators';
import { User } from '../Models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = '/api/user';

  // httpOptions = {
  //   headers: new HttpHeaders({
  //     Authorization: `Bearer ${window.localStorage.token}`,
  //   })
  // };

  private handleError<T>(operation: string = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }


  constructor(private http: HttpClient) { }

  addUser(user: User): Observable<User> {
    return this.http.post<IUser>(`${this.baseUrl}/register`, user).pipe(
      catchError(this.handleError('Register user', user))
    );
  }

  loginUser(loginData) {
    return this.http.post(`${this.baseUrl}/login`, loginData).pipe(
      map(token => {
        return token;
      }),
      catchError(this.handleError<IUser>('loginUser'))
    );
  }

  imageUpload(imageForm: FormData): Observable<any> {
    return this.http.patch('/api/profile', imageForm, this.httpOptions).pipe(
      catchError(this.handleError<IUser>('imageUpload'))
    );
  }

  getUserData(): Observable<IUser> {
    return this.http.get('/api/profile', this.httpOptions).pipe(
      catchError(this.handleError<IUser>('getUserData'))
    );
  }
}
