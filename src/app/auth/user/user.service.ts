import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private httpClient: HttpClient,
    private router: Router
  ) { }

  toSignin() {
    this.router.navigate(['/signin']);
  }

  getToken() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
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
    return this.httpClient.delete(url, { headers: { 'x-auth': this.getToken() } });
  }

  //get user questions
  findQuestionsByUser = (userId: string) => {
    let url = `api/user/questions`;
    console.log(this.getToken());
    return this.httpClient.get(url, { headers: { 'x-auth': this.getToken() }, params: { 'userId': userId } });
  }

  //get user answers
  findAnswersByUser = (userId: string) => {
    let url = `api/user/answers`;
    console.log(this.getToken());
    return this.httpClient.get(url, { headers: { 'x-auth': this.getToken() }, params: { 'userId': userId } });
  }
}
