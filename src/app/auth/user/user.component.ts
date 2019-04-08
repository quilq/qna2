import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthState } from '../store/auth.reducers';
import * as AuthActions from '../store/auth.actions';
import { User } from './user.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user : User;
  constructor(private store: Store<AuthState>, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(user => this.user = user);
  }

}
