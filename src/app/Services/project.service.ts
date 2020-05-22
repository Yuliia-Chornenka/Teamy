import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProject } from '../Models/project';
import { Observable } from 'rxjs';

interface IId {
  id: string;
  title: string;
}

@Injectable({
  providedIn: 'root'
})


export class ProjectService {

  constructor(private http: HttpClient) { }

  // projectId: string;
  // projecTtitle: string;

  createNewProject(newProject: IProject): Observable<IId> {
    return this.http.post<IId>(`/api/project/create`, newProject);
  }

  // saveProjectData(id: string, title: string) {
  //   this.projectId = id;
  //   this.projecTtitle = title;
  // }


  getProject(projectId: string) {
    return this.http.get(`/api/project/${projectId}`);
  }

  becomeProjectMember(projectId: string): Observable<object> {
    return this.http.patch(`/api/project/${projectId}`, {});
  }
}
