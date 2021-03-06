import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  baseUrl = 'api/team/';

  constructor(private http: HttpClient) {}

  convertToDate(timestamp): string {
    const date = new Date(timestamp);
    const months = [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    const mins = date.getMinutes();

    return `${day > 9 ? day : '0' + day}.${month}.${year} ${
      hours > 9 ? hours : '0' + hours
    }:${mins > 9 ? mins : '0' + mins}`;
  }

  createTeam(team): Observable<any> {
    return this.http.post(`${this.baseUrl}`, team);
  }

  getTeam(id) {
    return this.http.get(`${this.baseUrl}${id}`).toPromise();
  }

  getUser() {
    return this.http.get('api/profile').toPromise();
  }

  patchMessage(id, message) {
    return this.http.patch(`${this.baseUrl}${id}/history`, {
      message,
    });
  }

  patchTeamName(id, name) {
    return this.http.patch(`${this.baseUrl}${id}/name`, {
      name,
    });
  }

  patchTeamLinks(id, links) {
    return this.http.patch(`${this.baseUrl}${id}/links`, {
      links,
    });
  }

  patchMentorAssessment(id, mentorId, data) {
    return this.http.patch(`${this.baseUrl}${id}/assessment`, {
      comment: data.comment.trim(),
      mark: data.mark,
      mentorId,
    });
  }

  imageUpload(id: string, imageForm: FormData): Observable<any> {
    return this.http.patch(`${this.baseUrl}${id}/images`, imageForm);
  }

  fileUpload(id: string, imageForm: FormData): Observable<any> {
    return this.http.patch(`${this.baseUrl}${id}/files`, imageForm);
  }

  removeTeam(teamId: string) {
    return this.http.delete(`${this.baseUrl}${teamId}`);
  }
}
