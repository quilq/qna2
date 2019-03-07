import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as QuestionActions from './store/question.actions';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.store.dispatch(new QuestionActions.OnGetPopularQuestions());
  }

}
