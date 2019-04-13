import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthState } from '../../auth/store/auth.reducers';
import { isAuthenticated } from '../../auth/store/auth.selectors';
import * as AuthActions from '../../auth/store/auth.actions';
import * as QuestionActions from '../../questions/store/question.actions';
import { UserService } from '../../auth/user/user.service';
import { QuestionState } from '../../questions/store/question.reducers';
import { hasLoaded } from '../../questions/store/question.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // isAuthenticated$: Observable<boolean>;
  isAuthenticated: boolean;

  constructor(
    private userStore: Store<AuthState>,
    private questionStore: Store<QuestionState>,
    private userService: UserService
  ) { }

  ngOnInit() {
    // this.isAuthenticated$ = this.userStore.select(isAuthenticated);

    this.userStore.select(isAuthenticated).subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      let token = this.userService.getToken();
      if ((!isAuthenticated) && (token)) {
        this.userStore.dispatch(new AuthActions.OnAuthenticateUser({ token }));
      }
    });

    this.questionStore.select(hasLoaded).subscribe(hasLoaded => {
      if (!hasLoaded) {
        this.questionStore.dispatch(new QuestionActions.OnGetPopularQuestions());
      }
    })
  }

  onSignout() {
    this.userStore.dispatch(new AuthActions.OnSignout());
  }

}
