import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../Models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${window.localStorage.token}`,
    })
  };

  constructor(private http: HttpClient) { }

  imageUpload(imageForm: FormData): Observable<any> {
    return this.http.patch('/api/profile', imageForm, this.httpOptions);
  }

  getUserData(): Observable<IUser> {
    return this.http.get('/api/profile', this.httpOptions);
  }
}
