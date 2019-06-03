import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthState } from './store/auth.reducers';
import { isAuthenticated, getToken, selectUser } from './store/auth.selectors';
import { User } from './user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private ngUnsubscribe$ = new Subject();
  isAuthenticated: boolean;
  token: string;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private authStore: Store<AuthState>
  ) {
    this.authStore.select(isAuthenticated)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);

    this.authStore.select(getToken)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(token => this.token = token);
  }

  toSignin() {
    this.router.navigate(['/auth/signin']);
  }

  authenticateUser(token: string) {
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
    let url = 'api/user/signout';;
    return this.httpClient.delete(url, { headers: { 'x-auth': this.token } });
  }

  //get user questions
  findQuestionsByUser = (userId: string) => {
    let url = `api/user/questions`;
    return this.httpClient.get(url, { headers: { 'x-auth': this.token }, params: { 'userId': userId } });
  }

  //get user answers
  findAnswersByUser = (userId: string) => {
    let url = `api/user/answers`;
    return this.httpClient.get(url, { headers: { 'x-auth': this.token }, params: { 'userId': userId } });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
