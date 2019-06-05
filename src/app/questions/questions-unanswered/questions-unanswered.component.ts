import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { QuestionState } from '../store/question.reducers';
import { Question } from '../question.model';
import { getUnansweredQuestions } from '../store/question.selectors';
import * as QuestionActions from '../store/question.actions';

@Component({
  selector: 'app-questions-unanswered',
  templateUrl: './questions-unanswered.component.html',
  styleUrls: ['./questions-unanswered.component.scss']
})
export class QuestionsUnansweredComponent implements OnInit {
  private ngUnsubscribe$ = new Subject;
  unansweredQuestions: Question[];
  totalQuestions: number;

  constructor(
    // @Inject(PLATFORM_ID) private platformId: Object,
    private questionStore: Store<QuestionState>) { }

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

    // if (isPlatformBrowser(this.platformId)) {
      window.scroll(0, 0);
    // }
  }

  getMoreQuestions() {
    this.questionStore.dispatch(new QuestionActions.OnGetUnansweredQuestions({ next: this.unansweredQuestions.length }));
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
