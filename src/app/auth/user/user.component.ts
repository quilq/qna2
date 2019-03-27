import { Component, OnInit } from '@angular/core';
import * as AuthActions from '../store/auth.actions';
import { AuthState } from '../store/auth.reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private store: Store<AuthState>) { }

  ngOnInit() {
  }

  createUser(){
    this.store.dispatch(new AuthActions.OnSignup({username: 'test1', email: 'test1@mail.com', password: '111111'}));
  }

}
