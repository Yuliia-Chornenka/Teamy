import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) { }

  baseUrl = '/api/user';

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
}
