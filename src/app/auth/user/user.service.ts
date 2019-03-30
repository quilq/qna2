import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

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
    let token = localStorage.getItem('token');
    return this.httpClient.delete(url, { headers: { 'x-auth': token } });
  }

  // //get user questions
  // findQuestionsByUser = (userId: string) => {
  //   let url = `api/user/questions`;
  //   return this.httpClient.get(url, { headers: { 'userId': userId } });
  // }

  // //get user answers
  // findAnswesByUser = (userId: string) => {
  //   let url = `api/user/answers`;
  //   return this.httpClient.get(url, { headers: { 'userId': userId } });
  // }
}
