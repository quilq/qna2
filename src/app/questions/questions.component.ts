import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { Question } from './question.model';
import { QuestionState } from './store/question.reducers';
import { UserService } from '../auth/user/user.service';
import { User } from '../auth/user/user.model';
import * as QuestionActions from './store/question.actions';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  constructor(private store: Store<QuestionState>, private userService: UserService) { }

  // questions$: Observable<Question[]>
  isAuthenticated : boolean;
  user: User;

  ngOnInit() {
    this.userService.isAuthenticated().subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
    this.userService.getUser().subscribe(user => this.user = user);
    //check if questions are loaded? => if no => load questions
   }

  questionForm = new FormGroup({
    newQuestion: new FormControl(''),
    tag: new FormControl('')
  });

  onSubmit() {
    console.log(this.questionForm.value.newQuestion);

    let newQuestion = new Question();
    newQuestion.askedByUser = this.user;
    newQuestion.question = this.questionForm.value.newQuestion;
    newQuestion.tags.push(this.questionForm.value.tag);

    if (this.isAuthenticated){
      this.store.dispatch(new QuestionActions.OnCreateQuestion({question: newQuestion}));
    } else {
      //TODO: ALERT
      console.log('sign in to continue !');
      this.userService.toSignin();
    }
  }

}
