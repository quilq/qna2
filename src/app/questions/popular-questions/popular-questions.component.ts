import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { QuestionState } from '../store/question.reducers';
import { Question } from '../question.model';
// import { getPopularQuestions, hasLoaded } from '../store/question.selectors';
import { getPopularQuestions } from '../store/question.selectors';
import * as QuestionActions from '../store/question.actions';

@Component({
  selector: 'app-popular-questions',
  templateUrl: './popular-questions.component.html',
  styleUrls: ['./popular-questions.component.scss']
})
export class PopularQuestionsComponent implements OnInit {

  private ngUnsubscribe$ = new Subject();
  popularQuestions: Question[];
  totalQuestions: number;

  constructor(private store: Store<QuestionState>) { }

  ngOnInit() {
    this.store.dispatch(new QuestionActions.OnGetPopularQuestions({ next: 0 }));
    // this.store.select(hasLoaded)
    //   .pipe(takeUntil(this.ngUnsubscribe$))
    //   .subscribe(hasLoaded => {
    //     if (!hasLoaded) {
    //       this.store.dispatch(new QuestionActions.OnGetPopularQuestions({ next: 0 }));
    //     }
    //   });

    this.store.select(getPopularQuestions)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(questionsState => {
        this.totalQuestions = questionsState.totalQuestions;
        this.popularQuestions = questionsState.questions;
      });

    window.scroll(0, 0);
  }

  getMoreQuestions() {
    this.store.dispatch(new QuestionActions.OnGetPopularQuestions({ next: this.popularQuestions.length }));
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
