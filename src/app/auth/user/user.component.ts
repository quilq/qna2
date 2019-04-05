import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthState } from '../store/auth.reducers';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private store: Store<AuthState>) { }

  ngOnInit() {
  }


}
