import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Question } from '../../questions/question.model';
import { QuestionState } from '../../questions/store/question.reducers';
import { AuthService } from '../../auth/auth.service';
import { isAuthenticated } from '../../auth/store/auth.selectors';
import * as QuestionActions from '../../questions/store/question.actions';

@Component({
  selector: 'app-question-details-view',
  templateUrl: './question-details-view.component.html',
  styleUrls: ['./question-details-view.component.scss']
})
export class QuestionDetailsViewComponent implements OnInit, OnDestroy {

  @Input() question: Question;

  private ngUnsubscribe$ = new Subject();

  isAuthenticated = false;
  canEditQuestion = false;
  canEditAnswer = false;

  constructor(private questionStore: Store<QuestionState>,
    private userStore: Store<QuestionState>,
    private userService: AuthService) { }

  ngOnInit() {
    this.userStore.select(isAuthenticated)
    .pipe(takeUntil(this.ngUnsubscribe$))
    .subscribe(isAuthenticated =>
      this.isAuthenticated = isAuthenticated
    );
  }

  onEditQuestion() {
    this.canEditQuestion = true;
  }

  onCancelEditQuestion() {
    this.canEditQuestion = false;
  }

  editQuestion(questionId: string, newQuestion: string) {
    if (this.isAuthenticated) {
      this.questionStore.dispatch(new QuestionActions.OnEditQuestion({ questionId, newQuestion }));
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
      this.questionStore.dispatch(new QuestionActions.OnEditAnswer({ questionId, answerId, newAnswer }));
      this.onCancelEditAnswer();
    } else {
      this.userService.toSignin();
    }
  }

  deleteQuestion(questionId: string) {
    if (this.isAuthenticated) {
      this.questionStore.dispatch(new QuestionActions.OnDeleteQuestion({ questionId }));
    } else {
      this.userService.toSignin();
    }
  }

  voteQuestion(questionId: string, upvote: boolean) {
    if (this.isAuthenticated) {
      console.log('begin to vote');
      this.questionStore.dispatch(new QuestionActions.OnVoteQuestion({ questionId, upvote }));
    } else {
      console.log('vote error');
      this.userService.toSignin();
    }
  }

  deleteAnswer(questionId: string, answerId: string) {
    this.questionStore.dispatch(new QuestionActions.OnDeleteAnswer({ questionId, answerId }));
  }

  voteAnswer(questionId: string, answerId: string, upvote: boolean) {
    this.questionStore.dispatch(new QuestionActions.OnVoteAnswer({ questionId, answerId, upvote }));
  }

  updateCorrectAnswer(questionId: string, correctAnswerId: string, undo: boolean) {
    this.questionStore.dispatch(new QuestionActions.OnUpdateCorrectAnswer({ questionId, correctAnswerId, undo }));
  }

  ngOnDestroy(){
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
