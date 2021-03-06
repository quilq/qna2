import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { QuestionState } from '../store/question.reducers';
import { Question } from '../question.model';
import { getRecentQuestions } from '../store/question.selectors';
import * as QuestionActions from '../store/question.actions';
// import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-questions-recent',
  templateUrl: './questions-recent.component.html',
  styleUrls: ['./questions-recent.component.scss']
})
export class QuestionsRecentComponent implements OnInit, OnDestroy {
  recentQuestions: Question[];
  totalQuestions: number;
  
  private ngUnsubscribe$ = new Subject();

  constructor(
    // @Inject(PLATFORM_ID) private platformId: Object,
    private questionStore: Store<QuestionState>
    ) { }

  ngOnInit() {
    this.questionStore.select(getRecentQuestions)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(questionsState => {
        if (questionsState.totalQuestions > 0) {
          this.totalQuestions = questionsState.totalQuestions;
          this.recentQuestions = questionsState.questions;
        } else {
          this.questionStore.dispatch(QuestionActions.onGetRecentQuestions({ next: 0 }));
        }
      });

    // if (isPlatformBrowser(this.platformId)) {
      // window.scroll(0, 0);
    // }
  }

  getMoreQuestions() {
    this.questionStore.dispatch(QuestionActions.onGetRecentQuestions({ next: this.recentQuestions.length }));
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
