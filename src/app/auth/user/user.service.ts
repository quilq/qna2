import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { User } from './user.model';
import { AuthState } from '../store/auth.reducers';
import { selectUser, isAuthenticated } from '../store/auth.selectors';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
    private store: Store<AuthState>,
    private router: Router) { }

  getUser(): Observable<User> {
    return this.store.select(selectUser);
  }

  isAuthenticated(): Observable<boolean> {
    return this.store.select(isAuthenticated);
  }

  toSignin() {
    this.router.navigate(['/signin']);
  }

  getToken() {
    return localStorage.getItem('token');
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
