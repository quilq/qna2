import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthState } from '../store/auth.reducers';
import { User } from './user.model';
import { selectUser, getUserQuestions, getUserAnswers } from '../store/auth.selectors';
import { Observable } from 'rxjs';
import { Question } from 'src/app/questions/question.model';
import { OnGetUserQuestions, OnGetUserAnswers } from '../store/auth.actions';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

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
    this.authStore.dispatch(new OnGetUserQuestions({userId}));
  }

  getUserAnswers(userId: string){
    this.authStore.dispatch(new OnGetUserAnswers({userId}));
  }


}
