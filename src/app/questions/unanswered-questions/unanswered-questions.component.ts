import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { QuestionState } from '../store/question.reducers';
import { Question } from '../question.model';
import { getUnansweredQuestions } from '../store/question.selectors';
import * as QuestionActions from '../store/question.actions';

@Component({
  selector: 'app-unanswered-questions',
  templateUrl: './unanswered-questions.component.html',
  styleUrls: ['./unanswered-questions.component.scss']
})
export class UnansweredQuestionsComponent implements OnInit {

  unansweredQuestions$ : Observable<Question[]>;

  constructor(private questionStore: Store<QuestionState>) { }

  ngOnInit() {
    console.log('unanswered-question component init');
    this.questionStore.dispatch(new QuestionActions.OnGetUnansweredQuestions());
    this.unansweredQuestions$ = this.questionStore.select(getUnansweredQuestions);
    this.unansweredQuestions$.subscribe(q => console.log('un q', q));
  }

}
