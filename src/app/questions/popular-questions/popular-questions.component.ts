import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { QuestionState } from '../store/question.reducers';
import * as QuestionActions from '../store/question.actions';
import { Question } from '../question.model';
import { getQuestions, hasLoaded } from '../store/question.selectors';

@Component({
  selector: 'app-popular-questions',
  templateUrl: './popular-questions.component.html',
  styleUrls: ['./popular-questions.component.scss']
})
export class PopularQuestionsComponent implements OnInit {

  hasLoaded: boolean;
  questions: Question[];

  constructor(private store: Store<QuestionState>) { }

  ngOnInit() {
    this.store.select(hasLoaded).subscribe(hasLoaded => {
      if (!hasLoaded) {
        this.store.dispatch(new QuestionActions.OnGetPopularQuestions());
      }
    });

    this.store.select(getQuestions).subscribe(questions => this.questions = questions);
  }

}
