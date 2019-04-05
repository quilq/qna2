import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthState } from '../../auth/store/auth.reducers';
import { isAuthenticated } from '../../auth/store/auth.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuthenticated$: Observable<boolean>;

  constructor(private store: Store<AuthState>) { }

  ngOnInit() {
    this.store.select(isAuthenticated).subscribe(x => console.log('TEST AUTH ', x));

    this.isAuthenticated$ = this.store.select('auth')
      .pipe(map(authState => authState.isAuthenticated));
  }

  onSignout() {
    console.log('Signed out!');
  }

}
