import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthState } from '../../auth/store/auth.reducers';
import { UserService } from '../../auth/user/user.service';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private userStore: Store<AuthState>,
    private userService: UserService
  ) { }

  ngOnInit() {
    let isAuthenticated = this.userService.isAuthenticated;
    let token = localStorage.getItem('token');
    if ((!isAuthenticated) && (token)) {
      this.userStore.dispatch(new AuthActions.OnAuthenticateUser({ token }));
    }
  }

  onSignout() {
    this.userStore.dispatch(new AuthActions.OnSignout());
  }

  toggleSidenav() {
    this.sidenavEvent.emit(null);
  }
}
