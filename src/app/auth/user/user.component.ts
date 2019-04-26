import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthState } from '../store/auth.reducers';
import { User } from './user.model';
import { selectUser } from '../store/auth.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user$: Observable<User>;
  constructor(private store: Store<AuthState>) { }

  ngOnInit() {
    this.user$ = this.store.select(selectUser);
  }

}
