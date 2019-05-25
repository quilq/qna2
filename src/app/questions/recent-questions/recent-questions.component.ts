import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { QuestionState } from '../store/question.reducers';
import { Question } from '../question.model';
import { getRecentQuestions } from '../store/question.selectors';
import * as QuestionActions from '../store/question.actions';

@Component({
  selector: 'app-recent-questions',
  templateUrl: './recent-questions.component.html',
  styleUrls: ['./recent-questions.component.scss']
})
export class RecentQuestionsComponent implements OnInit, OnDestroy {
  private ngUnsubscribe$ = new Subject();
  recentQuestions: Question[];
  totalQuestions: number;

  constructor(private questionStore: Store<QuestionState>) { }

  ngOnInit() {
    this.questionStore.select(getRecentQuestions)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(questionsState => {
        if (questionsState.totalQuestions > 0) {
          console.log(questionsState);
          this.totalQuestions = questionsState.totalQuestions;
          this.recentQuestions = questionsState.questions;
        } else {
          this.questionStore.dispatch(new QuestionActions.OnGetRecentQuestions({ next: 0 }));
        }
      });

    window.scroll(0, 0);
  }

  getMoreQuestions() {
    this.questionStore.dispatch(new QuestionActions.OnGetRecentQuestions({ next: this.recentQuestions.length }));
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
