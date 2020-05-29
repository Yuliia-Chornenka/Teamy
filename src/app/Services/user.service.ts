import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IUser } from '../Models/user.model';
import { User } from '../Models/user';
import { IProject } from '../Models/project';


interface IId {
  id: string;
  title: string;
  deadline: number;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

  baseUrl = '/api/user';

  constructor(private http: HttpClient) { }

  addUser(user: User): Observable<User> {
    return this.http.post<IUser>(`${this.baseUrl}/register`, user);
  }

  addSocUser(user: User): Observable<User> {
    return this.http.post<IUser>(`${this.baseUrl}/soclogin`, user);
  }

  imageUpload(imageForm: FormData): Observable<any> {
    return this.http.patch('/api/profile', imageForm);
  }

  addUsersProject(project: IId): Observable<IId> {
    return this.http.put<IId>(`/api/profile/project-mentor`, project);
  }

  addUserMemberProject(project: IProject): Observable<IProject> {
    return this.http.put<IProject>(`/api/profile/project-member`, project);
  }

  getUserData(): Observable<IUser> {
    return this.http.get('/api/profile');
  }
}
