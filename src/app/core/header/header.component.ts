import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthState } from '../../auth/store/auth.reducers';
import { UserService } from '../../auth/user/user.service';
import * as AuthActions from './../../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuthenticated$: Observable<boolean>;

  constructor(private store: Store<AuthState>, private userService: UserService) { }

  ngOnInit() {
    this.isAuthenticated$ = this.userService.isAuthenticated();
  }

  onSignout() {
    this.store.dispatch(new AuthActions.OnSignout());
  }

}
