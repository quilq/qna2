import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthState } from './store/auth.reducers';
import { isAuthenticated, getToken } from './store/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  isAuthenticated = false;
  token: string = '';

  private ngUnsubscribe$ = new Subject();

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private authStore: Store<AuthState>,
    private snackBar: MatSnackBar
  ) {
    this.authStore.select(isAuthenticated)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);

    this.authStore.select(getToken)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(token => this.token = token);
  }

  toSignin() {
    let message = 'Sign in to continue !';
    this.errorAlert(message);

    this.router.navigate(['/auth/signin']);
  }

  errorAlert(message: string) {
    this.snackBar.open(message, 'Ok', {
      duration: 5000,
      verticalPosition: 'top'
    })
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
