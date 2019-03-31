import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthState } from '../../auth/store/auth.reducers';
import { isAuthenticated } from '../../auth/store/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuthenticated$: Observable<boolean>;

  constructor(private store: Store<AuthState>) { }

  ngOnInit() {
    this.isAuthenticated$ = this.store.select(isAuthenticated);
  }

  onSignout(){
    console.log('Signed out!');
  }

}
