import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup } from '@angular/forms';

import { Question } from './question.model';
import { selectQuestion } from './store/question.selectors';
import { Observable } from 'rxjs';
import { QuestionState } from './store/question.reducers';
import * as QuestionActions from './store/question.actions';

import { selectUser } from '../auth/store/auth.selectors';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  constructor(private store: Store<QuestionState>) { }

  questions$: Observable<Question[]>

  ngOnInit() {
    this.store.dispatch(new QuestionActions.OnGetPopularQuestions());
    this.questions$ = this.store.select(selectQuestion);

    this.questions$.subscribe(qs => console.log('questions: ', qs));
  }

  questionForm = new FormGroup({
    newQuestion: new FormControl('')
  });
  
  user: any;

  onSubmit() {
    console.log(this.questionForm.value.newQuestion);

    // this.store.select(selectUser).subscribe(user => this.user = user);

    // let newQuestion = new Question();
    // newQuestion.question = this.questionForm.value.newQuestion;
    // newQuestion.askedByUser = this.user;

    // this.store.dispatch(new QuestionActions.OnCreateQuestion({question: newQuestion}));
    // console.log(this.store)
  }

}
