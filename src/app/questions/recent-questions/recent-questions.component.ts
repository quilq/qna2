import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { QuestionState } from '../store/question.reducers';
import { Question } from '../question.model';
import { getUnansweredQuestions, getRecentQuestions } from '../store/question.selectors';
import * as QuestionActions from '../store/question.actions';

@Component({
  selector: 'app-recent-questions',
  templateUrl: './recent-questions.component.html',
  styleUrls: ['./recent-questions.component.scss']
})
export class RecentQuestionsComponent implements OnInit {

  recentQuestions$ : Observable<Question[]>;

  constructor(private questionStore: Store<QuestionState>) { }

  ngOnInit() {
    console.log('recent-questions component init');
    this.questionStore.dispatch(new QuestionActions.OnGetRecentQuestions());
    this.recentQuestions$ = this.questionStore.select(getRecentQuestions);
  }
}
