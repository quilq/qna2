import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup } from '@angular/forms';

import * as QuestionActions from './store/question.actions';
import { Question } from './question.model';
import { User } from '../auth/user/user.model';

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

  questionForm = new FormGroup({
    newQuestion: new FormControl('')
  })

  onSubmit(){
    console.log(this.questionForm.value.newQuestion);

    let newQuestion = new Question();
    let newUser = new User();
    
    // this.store.dispatch(new QuestionActions.OnCreateQuestion({question: newQuestion}));
    // console.log(this.store)
  }

}
