import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Answer } from '../../questions/question.model';
import { QuestionState } from '../../questions/store/question.reducers';
import { User } from '../../auth/user/user.model';
import { selectUser, isAuthenticated } from '../../auth/store/auth.selectors';
import { AuthService } from '../../auth/auth.service';
import { AuthState } from '../../auth/store/auth.reducers';
import * as QuestionActions from '../../questions/store/question.actions';

@Component({
  selector: 'app-new-answer',
  templateUrl: './new-answer.component.html',
  styleUrls: ['./new-answer.component.scss']
})
export class NewAnswerComponent implements OnInit, OnDestroy {

  @Input() questionId: string;

  private ngUnsubscribe$ = new Subject();
  user: User;
  canEditQuestion = false;
  canEditAnswer = false;

  answerForm = new FormGroup({
    newAnswer: new FormControl('')
  })

  constructor(private questionStore: Store<QuestionState>,
    private authStore: Store<AuthState>,
    private authService: AuthService) { }

  ngOnInit() {
    this.authStore.select(selectUser)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(user => this.user = user);
  }

  onSubmit() {
    if (this.authService.isAuthenticated) {
      let newAnswer = new Answer(this.answerForm.value.newAnswer, this.user);

      this.questionStore.dispatch(new QuestionActions.OnAddAnswer({
        questionId: this.questionId,
        newAnswer: newAnswer
      }));

      this.answerForm.reset();

    } else {
      this.authService.toSignin();
    }
  }

  ngOnDestroy(){
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
