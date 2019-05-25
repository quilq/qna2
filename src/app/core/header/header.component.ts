import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthState } from '../../auth/store/auth.reducers';
import { isAuthenticated } from '../../auth/store/auth.selectors';
import { UserService } from '../../auth/user/user.service';
// import { QuestionState } from '../../questions/store/question.reducers';
// import { hasLoaded } from '../../questions/store/question.selectors';
import * as AuthActions from '../../auth/store/auth.actions';
// import * as QuestionActions from '../../questions/store/question.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavEvent: EventEmitter<any> = new EventEmitter();
  // isSidenavOpen: boolean = false;
  private ngUnsubscribe$: Subject<any> = new Subject();
  isAuthenticated: boolean = false;

  constructor(
    private userStore: Store<AuthState>,
    // private questionStore: Store<QuestionState>,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userStore.select(isAuthenticated)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
        let token = this.userService.getToken();
        if ((!isAuthenticated) && (token)) {
          this.userStore.dispatch(new AuthActions.OnAuthenticateUser({ token }));
        }
      });

    // this.questionStore.select(hasLoaded)
    //   .pipe(takeUntil(this.ngUnsubscribe$))
    //   .subscribe(hasLoaded => {
    //     if (!hasLoaded) {
    //       this.questionStore.dispatch(new QuestionActions.OnGetPopularQuestions({next: 0}));
    //     }
    //   });
  }

  onSignout() {
    this.userStore.dispatch(new AuthActions.OnSignout());
  }

  toggleSidenav() {
    // this.isSidenavOpen = !this.isSidenavOpen;
    this.sidenavEvent.emit(null);
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
