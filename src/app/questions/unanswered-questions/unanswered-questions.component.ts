import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { QuestionState } from '../store/question.reducers';
import { Question } from '../question.model';
import { getUnansweredQuestions } from '../store/question.selectors';
import * as QuestionActions from '../store/question.actions';

@Component({
  selector: 'app-unanswered-questions',
  templateUrl: './unanswered-questions.component.html',
  styleUrls: ['./unanswered-questions.component.scss']
})
export class UnansweredQuestionsComponent implements OnInit {
  private ngUnsubscribe$ = new Subject;
  unansweredQuestions: Question[];
  totalQuestions: number;

  constructor(private questionStore: Store<QuestionState>) { }

  ngOnInit() {
    
    this.questionStore.select(getUnansweredQuestions)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(questionsState => {
        if (questionsState.totalQuestions > 0) {
          this.totalQuestions = questionsState.totalQuestions;
          this.unansweredQuestions = questionsState.questions;
        } else {
          this.questionStore.dispatch(new QuestionActions.OnGetUnansweredQuestions({ next: 0 }));
        }
      });


    window.scroll(0, 0);
  }

  getMoreQuestions() {
    this.questionStore.dispatch(new QuestionActions.OnGetUnansweredQuestions({ next: this.unansweredQuestions.length }));
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
