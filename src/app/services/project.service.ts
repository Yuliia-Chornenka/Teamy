import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProject } from '../models/project';
import { Observable } from 'rxjs';

interface IId {
  _id: string;
  title: string;
  deadline: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  createNewProject(newProject: IProject): Observable<IId> {
    return this.http.post<IId>(`/api/project/create`, newProject);
  }

  getProject(projectId: string) {
    return this.http.get(`/api/project/${projectId}`);
  }

  becomeProjectMember(projectId: string): Observable<IProject> {
    return this.http.patch<IProject>(`/api/project/members/${projectId}`, {});
  }

  becomeProjectMentor(data): Observable<IProject> {
    const { projectId, mentor } = data;

    return this.http.patch<IProject>(`/api/project/mentors/${projectId}`, {
      ...mentor,
    });
  }

  sendEmailToMembers(): Observable<any> {
    return this.http.post(`/api/project/send-email`, {});
  }
}