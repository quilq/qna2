import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as AuthActions from '../../auth/store/auth.actions';
import { AuthState } from '../../auth/store/auth.reducers';
import { AuthService } from '../../auth/auth.service';
import { isAuthenticated } from '../../auth/store/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavEvent: EventEmitter<any> = new EventEmitter();
  isAuthenticated$: Observable<boolean> ;

  constructor(
    private authStore: Store<AuthState>,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.isAuthenticated$ = this.authStore.select(isAuthenticated);

    let token = localStorage.getItem('token');
    if ((!this.authService.isAuthenticated) && (token)) {
      this.authStore.dispatch(AuthActions.onAuthenticateUser({ token }));
    }
  }

  onSignout() {
    this.authStore.dispatch(AuthActions.onSignout());
  }

  toggleSidenav() {
    this.sidenavEvent.emit(null);
  }
}
