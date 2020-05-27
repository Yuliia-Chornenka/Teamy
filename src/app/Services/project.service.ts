import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProject } from '../Models/project';
import { Observable } from 'rxjs';

interface IId {
  id: string;
  title: string;
}

interface IBecomeProjectMember {
  members: Array<string>;
}



@Injectable({
  providedIn: 'root'
})


export class ProjectService {

  constructor(private http: HttpClient) { }


  createNewProject(newProject: IProject): Observable<IId> {
    return this.http.post<IId>(`/api/project/create`, newProject);
  }


  getProject(projectId: string) {
    return this.http.get(`/api/project/${projectId}`);
  }

  becomeProjectMember(projectId: string): Observable<IBecomeProjectMember> {
    return this.http.patch<IBecomeProjectMember>(`/api/project/${projectId}`, {});
  }
}
