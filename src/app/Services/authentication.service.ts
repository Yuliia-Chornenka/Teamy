import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl = '/api/user';
  private marker: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient,
              private router: Router) { }

  loginUser(loginData) {
    return this.http
      .post(`${this.baseUrl}/login`, loginData);
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setValue(newValue): void {
    this.marker.next(newValue);
  }

  getValue(): Observable<boolean> {
    return this.marker.asObservable();
  }
}
