import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getFeaturedQuestions } from '../store/question.selectors';
import { OnGetFeaturedQuestions } from '../store/question.actions';
import { Question } from '../question.model';
import { QuestionState } from '../store/question.reducers';

@Component({
  selector: 'app-questions-featured',
  templateUrl: './questions-featured.component.html',
  styleUrls: ['./questions-featured.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class QuestionsFeaturedComponent implements OnInit {
  featuredQuestions$: Observable<Question[]>;

  constructor(private questionStore: Store<QuestionState>) { }

  ngOnInit() {
    this.questionStore.dispatch(new OnGetFeaturedQuestions());
    this.featuredQuestions$ = this.questionStore.select(getFeaturedQuestions);
  }
}
