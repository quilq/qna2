import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Question } from '../question.model';
import { getFeaturedQuestions } from '../store/question.selectors';
import { QuestionState } from '../store/question.reducers';
import * as QuestionActions from '../store/question.actions';

@Component({
  selector: 'app-questions-featured',
  templateUrl: './questions-featured.component.html',
  styleUrls: ['./questions-featured.component.scss'],
})
export class QuestionsFeaturedComponent implements OnInit {
  featuredQuestions$: Observable<Question[]>;

  constructor(private questionStore: Store<QuestionState>) { }

  ngOnInit() {
    this.questionStore.dispatch(QuestionActions.onGetFeaturedQuestions());
    this.featuredQuestions$ = this.questionStore.select(getFeaturedQuestions);
  }
}