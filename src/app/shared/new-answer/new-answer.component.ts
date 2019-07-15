import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Answer, Question } from '../../questions/question.model';
import { QuestionState } from '../../questions/store/question.reducers';
import { User } from '../../auth/user.model';
import { selectUser } from '../../auth/store/auth.selectors';
import { AuthService } from '../../auth/auth.service';
import { AuthState } from '../../auth/store/auth.reducers';
import * as QuestionActions from '../../questions/store/question.actions';

@Component({
  selector: 'app-new-answer',
  templateUrl: './new-answer.component.html',
  styleUrls: ['./new-answer.component.scss']
})
export class NewAnswerComponent implements OnInit, OnDestroy {
  @Input() question: Question;

  user: User;
  canEditQuestion = false;
  canEditAnswer = false;

  answerForm = new FormGroup({
    newAnswer: new FormControl('')
  })

  private ngUnsubscribe$ = new Subject();

  constructor(
    private questionStore: Store<QuestionState>,
    private authStore: Store<AuthState>,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.authStore.select(selectUser)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(user => this.user = user);
  }

  onSubmit() {
    if (this.authService.isAuthenticated) {
      let didAnswer = false;
      for (let i = 0; i < this.question.answers.length; i++) {
        if (this.user._id === this.question.answers[i]._id) {
          this.snackBar.open('You had answered this question.', 'Ok', {
            duration: 5000,
            verticalPosition: 'top'
          });
          didAnswer = true;
        }
      }

      if (!didAnswer) {
        let newAnswer = new Answer(this.answerForm.value.newAnswer, this.user);

        this.questionStore.dispatch(QuestionActions.onAddAnswer({
          questionId: this.question._id,
          newAnswer: newAnswer
        }));

        this.answerForm.reset();
      }
    } else {
      this.authService.toSignin();
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
