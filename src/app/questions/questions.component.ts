import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { Question } from './question.model';
import { QuestionState } from './store/question.reducers';
import * as QuestionActions from './store/question.actions';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  constructor(private store: Store<QuestionState>) { }

  questions$: Observable<Question[]>

  ngOnInit() { }

  questionForm = new FormGroup({
    newQuestion: new FormControl('')
  });

  onSubmit() {
    console.log(this.questionForm.value.newQuestion);
  }

}
