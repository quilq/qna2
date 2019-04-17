import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl } from '@angular/forms';

import { Question, Answer } from '../../questions/question.model';
import { QuestionState } from '../../questions/store/question.reducers';
import { User } from '../../auth/user/user.model';
import { selectUser, isAuthenticated } from '../../auth/store/auth.selectors';
import { UserService } from '../../auth/user/user.service';
import * as QuestionActions from '../../questions/store/question.actions';

@Component({
  selector: 'app-new-answer',
  templateUrl: './new-answer.component.html',
  styleUrls: ['./new-answer.component.scss']
})
export class NewAnswerComponent implements OnInit {


  question: Question;
  user: User;
  isAuthenticated = false;
  canEditQuestion = false;
  canEditAnswer = false;

  answerForm = new FormGroup({
    newAnswer: new FormControl('')
  })

  constructor(private questionStore: Store<QuestionState>,
    private userStore: Store<QuestionState>,
    private userService: UserService) { }

  ngOnInit() {
    this.userStore.select(selectUser).subscribe(user => this.user = user);
    this.userStore.select(isAuthenticated).subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
  }

  onSubmit() {
    if (this.isAuthenticated) {
      let newAnswer = new Answer(this.answerForm.value.newAnswer, this.user);
      console.log(newAnswer);
      this.questionStore.dispatch(new QuestionActions.OnAddAnswer({
        questionId: this.question._id,
        newAnswer: newAnswer
      }));
    } else {
      this.userService.toSignin();
    }
  }
}
