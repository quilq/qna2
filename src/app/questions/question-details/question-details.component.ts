import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import { Question } from '../question.model';
import { QuestionState } from '../store/question.reducers';
import { getQuestionById } from '../store/question.selectors';
import { User } from '../../auth/user/user.model';
import * as QuestionActions from '../store/question.actions';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.scss']
})
export class QuestionDetailsComponent implements OnInit {

  question: Question;

  constructor(private questionStore: Store<QuestionState>,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    this.questionStore.dispatch(new QuestionActions.OnFindQuestionById({ id }));

    this.questionStore.select(getQuestionById).subscribe(question => this.question = question);
  }

}
