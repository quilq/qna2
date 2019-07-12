import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Question } from '../../questions/question.model';
import { QuestionState } from '../../questions/store/question.reducers';
import { AuthService } from '../../auth/auth.service';
import { isAuthenticated, selectUser } from '../../auth/store/auth.selectors';
import { User } from '../../auth/user/user.model';
import * as QuestionActions from '../../questions/store/question.actions';

@Component({
  selector: 'app-question-details-view',
  templateUrl: './question-details-view.component.html',
  styleUrls: ['./question-details-view.component.scss']
})
export class QuestionDetailsViewComponent implements OnInit, OnDestroy {

  @Input() question: Question;
  user: User;
  isAuthenticated = false;
  canEditQuestion = false;
  canEditAnswer = false;

  private ngUnsubscribe$ = new Subject();

  constructor(
    private questionStore: Store<QuestionState>,
    private userStore: Store<QuestionState>,
    private userService: AuthService
  ) { }

  ngOnInit() {
    this.userStore.select(isAuthenticated)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);

    this.userStore.select(selectUser)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(user => this.user = user);
  }

  onEditQuestion() {
    this.canEditQuestion = true;
  }

  onCancelEditQuestion() {
    this.canEditQuestion = false;
  }

  editQuestion(questionId: string, newQuestion: string) {
    if (this.isAuthenticated) {
      this.questionStore.dispatch(QuestionActions.onEditQuestion({ questionId, newQuestion }));
      this.onCancelEditQuestion();
    } else {
      this.userService.toSignin();
    }
  }

  onEditAnswer() {
    this.canEditAnswer = true;
  }

  onCancelEditAnswer() {
    this.canEditAnswer = false;
  }

  editAnswer(questionId: string, answerId: string, newAnswer: string) {
    if (this.isAuthenticated) {
      this.questionStore.dispatch(QuestionActions.onEditAnswer({ questionId, answerId, newAnswer }));
      this.onCancelEditAnswer();
    } else {
      this.userService.toSignin();
    }
  }

  deleteQuestion(questionId: string) {
    if (this.isAuthenticated) {
      this.questionStore.dispatch(QuestionActions.onDeleteQuestion({ questionId }));
    } else {
      this.userService.toSignin();
    }
  }

  voteQuestion(questionId: string, upvote: boolean) {
    if (this.isAuthenticated) {
      this.questionStore.dispatch(QuestionActions.onVoteQuestion({ questionId, upvote }));
    } else {
      this.userService.toSignin();
    }
  }

  deleteAnswer(questionId: string, answerId: string) {
    this.questionStore.dispatch(QuestionActions.onDeleteAnswer({ questionId, answerId }));
  }

  voteAnswer(questionId: string, answerId: string, upvote: boolean) {
    this.questionStore.dispatch(QuestionActions.onVoteAnswer({ questionId, answerId, upvote }));
  }

  updateCorrectAnswer(questionId: string, correctAnswerId: string, undo: boolean) {
    this.questionStore.dispatch(QuestionActions.onUpdateCorrectAnswer({ questionId, correctAnswerId, undo }));
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
