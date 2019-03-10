import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  signin(userCredentials: {email: string, password: string}){
    let url = 'api/user/signin';
    return this.httpClient.post(url, {userCredentials});
  }

  signup(user: User){
    let url = 'api/user/signup';
    return this.httpClient.post(url, user);
  }

  signout(token: string){
    let url = 'api/user/signout';
    return this.httpClient.delete(url, {headers: {'x-auth': token}});
  }
}
