import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
// import { isPlatformBrowser } from '@angular/common';

import { QuestionState } from '../store/question.reducers';
import { Question } from '../question.model';
import { getPopularQuestions } from '../store/question.selectors';
import * as QuestionActions from '../store/question.actions';

@Component({
  selector: 'app-questions-popular',
  templateUrl: './questions-popular.component.html',
  styleUrls: ['./questions-popular.component.scss']
})
export class QuestionsPopularComponent implements OnInit {

  private ngUnsubscribe$ = new Subject();
  popularQuestions: Question[];
  totalQuestions: number;

  constructor(
    // @Inject(PLATFORM_ID) private platformId: Object,
    private questionStore: Store<QuestionState>) { }

  ngOnInit() {
    this.questionStore.select(getPopularQuestions)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(questionsState => {
        if (questionsState.totalQuestions > 0) {
          this.totalQuestions = questionsState.totalQuestions;
          this.popularQuestions = questionsState.questions;
        } else {
          this.questionStore.dispatch(new QuestionActions.OnGetPopularQuestions({ next: 0 }));
        }
      });

    // if (isPlatformBrowser(this.platformId)) {
      window.scroll(0, 0);
    // }
  }

  getMoreQuestions() {
    this.questionStore.dispatch(new QuestionActions.OnGetPopularQuestions({ next: this.popularQuestions.length }));
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
