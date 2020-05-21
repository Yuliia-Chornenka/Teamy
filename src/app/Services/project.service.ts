import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProject } from '../Models/project'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  createNewProject(newProject: IProject): Observable<IProject> {
    return this.http.post<IProject>(`/api/create-project`, newProject)
  }
}
