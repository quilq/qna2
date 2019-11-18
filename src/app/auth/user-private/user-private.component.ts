import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthState } from '../store/auth.reducers';
import { User } from '../user.model';
import { selectUser, getUserQuestions, getUserAnswers } from '../store/auth.selectors';
import { Question } from '../../questions/question.model';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-user',
  templateUrl: './user-private.component.html',
  styleUrls: ['./user-private.component.scss']
})
export class UserPrivateComponent implements OnInit {
  user$: Observable<User>;
  userQuestions$: Observable<Question[]>;
  userAnswers$: Observable<Question[]>;

  constructor(private authStore: Store<AuthState>) { }

  ngOnInit() {
    this.user$ = this.authStore.select(selectUser);
    this.userQuestions$ = this.authStore.select(getUserQuestions);
    this.userAnswers$ = this.authStore.select(getUserAnswers);
  }

  getUserQuestions(userId: string){
    this.authStore.dispatch(AuthActions.onGetUserQuestions({userId}));
  }

  getUserAnswers(userId: string){
    this.authStore.dispatch(AuthActions.onGetUserAnswers({userId}));
  }

}
