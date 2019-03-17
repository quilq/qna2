import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  signin(email: string, password: string){
    let url = 'api/user/signin';
    return this.httpClient.post(url, {email, password});
  }

  signup(user: User, password: string){
    let url = 'api/user/signup';
    return this.httpClient.post(url, { username: user.username, email: user.email, password });
  }

  signout(){
    let url = 'api/user/signout';
    let token = localStorage.getItem('token');
    return this.httpClient.delete(url, {headers: {'x-auth': token}});
  }
}
