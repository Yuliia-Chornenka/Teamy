import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProject } from '../Models/project';
import { Observable } from 'rxjs';

interface IId {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  createNewProject(newProject: IProject): Observable<IId> {
    return this.http.post<IId>(`/api/create-project`, newProject);
  }

  getProjectData(projectId): Observable<IProject> {
    return this.http.get<IProject>(`/api/project/${projectId}`);
  }
}
