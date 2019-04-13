import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthState } from '../store/auth.reducers';
import { isAuthenticated } from '../store/auth.selectors';
import { Signin } from '../store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private store: Store<AuthState>) { }

  toSignin() {
    this.router.navigate(['/signin']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  authenticateUser(token: string) {
    console.log('auth called. Token: ', token);
    let url = `api/user/auth`;
    return this.httpClient.get(url, { headers: { 'x-auth': token } });
  }

  signin(email: string, password: string) {
    let url = 'api/user/signin';
    return this.httpClient.post(url, { email, password }, { observe: 'response' });
  }

  signup(username: string, email: string, password: string) {
    let url = 'api/user/signup';
    return this.httpClient.post(url, { username, email, password }, { observe: 'response' });
  }

  signout() {
    let url = 'api/user/signout';
    let token = this.getToken();
    return this.httpClient.delete(url, { headers: { 'x-auth': token } });
  }

  //get user questions
  findQuestionsByUser = (userId: string) => {
    let url = `api/user/questions`;
    return this.httpClient.get(url, { headers: { 'userId': userId } });
  }

  //get user answers
  findAnswesByUser = (userId: string) => {
    let url = `api/user/answers`;
    return this.httpClient.get(url, { headers: { 'userId': userId } });
  }
}
