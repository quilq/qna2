import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';

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
  isAuthenticated: boolean;
  user: User;

  visible = true;
  selectable = true;
  removable = true;  //delete current tag
  addOnBlur = true;
  
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: string[] = [];

  ngOnInit() {
    this.userService.isAuthenticated().subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
    this.userService.getUser().subscribe(user => this.user = user);
    //check if questions are loaded? => if no => load questions
  }

  questionForm = new FormGroup({
    newQuestion: new FormControl(''),
    tag: new FormControl('')
  });

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our tag
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  onSubmit() {
    let newQuestion = new Question(this.tags, this.questionForm.value.newQuestion, this.user);

    if (this.isAuthenticated) {
      this.store.dispatch(new QuestionActions.OnCreateQuestion({ question: newQuestion }));
    } else {
      //TODO: ALERT
      console.log('sign in to continue !');
      this.userService.toSignin();
    }
  }

}
