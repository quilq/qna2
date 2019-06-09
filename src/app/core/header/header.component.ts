import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthState } from '../../auth/store/auth.reducers';
import { AuthService } from '../../auth/auth.service';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavEvent: EventEmitter<any> = new EventEmitter();
  isAuthenticated: boolean;

  constructor(
    private authStore: Store<AuthState>,
    private authService: AuthService
  ) {
    this.isAuthenticated = this.authService.isAuthenticated;
  }

  ngOnInit() {
    let token = localStorage.getItem('token');
    if ((!this.authService.isAuthenticated) && (token)) {
      this.authStore.dispatch(new AuthActions.OnAuthenticateUser({ token }));
    }
  }

  onSignout() {
    this.authStore.dispatch(new AuthActions.OnSignout());
  }

  toggleSidenav() {
    this.sidenavEvent.emit(null);
  }
}
