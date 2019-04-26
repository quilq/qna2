import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { QuestionState } from '../store/question.reducers';
import { Question } from '../question.model';
import { getPopularQuestions, hasLoaded } from '../store/question.selectors';
import * as QuestionActions from '../store/question.actions';

@Component({
  selector: 'app-popular-questions',
  templateUrl: './popular-questions.component.html',
  styleUrls: ['./popular-questions.component.scss']
})
export class PopularQuestionsComponent implements OnInit {

  private ngUnsubscribe$ = new Subject();
  questions: Question[];

  constructor(private store: Store<QuestionState>) { }

  ngOnInit() {
    this.store.select(hasLoaded)
    .pipe(takeUntil(this.ngUnsubscribe$))
    .subscribe(hasLoaded => {
      if (!hasLoaded) {
        this.store.dispatch(new QuestionActions.OnGetPopularQuestions());
      }
    });

    this.store.select(getPopularQuestions).subscribe(questions => this.questions = questions);
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
