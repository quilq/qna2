import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { QuestionState } from '../store/question.reducers';
import { Question } from '../question.model';
import { getRecentQuestions } from '../store/question.selectors';
import * as QuestionActions from '../store/question.actions';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-questions-recent',
  templateUrl: './questions-recent.component.html',
  styleUrls: ['./questions-recent.component.scss']
})
export class QuestionsRecentComponent implements OnInit, OnDestroy {
  private ngUnsubscribe$ = new Subject();
  recentQuestions: Question[];
  totalQuestions: number;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private questionStore: Store<QuestionState>) { }

  ngOnInit() {
    this.questionStore.select(getRecentQuestions)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(questionsState => {
        if (questionsState.totalQuestions > 0) {
          this.totalQuestions = questionsState.totalQuestions;
          this.recentQuestions = questionsState.questions;
        } else {
          this.questionStore.dispatch(new QuestionActions.OnGetRecentQuestions({ next: 0 }));
        }
      });

    if (isPlatformBrowser(this.platformId)) {
      window.scroll(0, 0);
    }
  }

  getMoreQuestions() {
    this.questionStore.dispatch(new QuestionActions.OnGetRecentQuestions({ next: this.recentQuestions.length }));
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
