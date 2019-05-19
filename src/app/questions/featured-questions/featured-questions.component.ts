import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { getFeaturedQuestions } from '../store/question.selectors';
import { OnGetFeaturedQuestions } from '../store/question.actions';
import { Question } from '../question.model';
import { QuestionState } from '../store/question.reducers';

@Component({
  selector: 'app-featured-questions',
  templateUrl: './featured-questions.component.html',
  styleUrls: ['./featured-questions.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class FeaturedQuestionsComponent implements OnInit {

  featuredQuestions$: Observable<Question[]>;

  constructor(private questionStore: Store<QuestionState>) { }

  ngOnInit() {
    this.questionStore.dispatch(new OnGetFeaturedQuestions());
    this.featuredQuestions$ = this.questionStore.select(getFeaturedQuestions);
  }
}
