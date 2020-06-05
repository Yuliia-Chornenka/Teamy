import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../Models/user.model';
import { User } from '../Models/user';
import { IProject } from '../Models/project';
import { UserInterface } from '../components/project/add-mentor-form/add-mentor-form.component';

interface IId {
  _id: string;
  title: string;
  deadline: number;
}

interface IToken {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = '/api/user';

  constructor(private http: HttpClient) {}

  addUser(user: User): Observable<User> {
    return this.http.post<IUser>(`${this.baseUrl}/register`, user);
  }

  addSocUser(user: User): Observable<IToken> {
    return this.http.post<IToken>(`${this.baseUrl}/login/fb`, user);
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

  deleteUserAccount(): Observable<object> {
    return this.http.delete('/api/profile');
  }

  changeAccountPassword(passwords: object): Observable<object> {
    return this.http.put('/api/profile/change-password', passwords);
  }

  getUser(userId): Observable<UserInterface> {
    return this.http.get<UserInterface>(`/api/users/${userId}`);
  }

  getUsers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>('/api/users');
  }
}
