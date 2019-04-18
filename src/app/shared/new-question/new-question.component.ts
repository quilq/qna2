import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';

import { Question } from '../../questions/question.model';
import { QuestionState } from '../../questions/store/question.reducers';
import { UserService } from '../../auth/user/user.service';
import { User } from '../../auth/user/user.model';
import * as QuestionActions from '../../questions/store/question.actions';
import { isAuthenticated, selectUser } from '../../auth/store/auth.selectors';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss']
})
export class NewQuestionComponent implements OnInit {
  // questions$: Observable<Question[]>
  isAuthenticated: boolean;
  user: User;

  constructor(
    private store: Store<QuestionState>,
    private userService: UserService) { }

  visible = true;
  selectable = true;
  removable = true;  //delete current tag
  addOnBlur = true;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: string[] = [];

  questionForm = new FormGroup({
    questionTitle: new FormControl(''),
    questionContent: new FormControl(''),
    tag: new FormControl('')
  });

  ngOnInit() {
    this.store.select(isAuthenticated).subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
    this.store.select(selectUser).subscribe(user => this.user = user);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add tag
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
    let newQuestion = new Question(
      this.tags,
      this.questionForm.value.questionTitle,
      this.questionForm.value.questionContent,
      this.user
    );

    if (this.isAuthenticated) {
      this.store.dispatch(new QuestionActions.OnCreateQuestion({ question: newQuestion }));
    } else {
      //TODO: ALERT
      console.log('sign in to continue !');
      this.userService.toSignin();
    }

    this.questionForm.reset('');
    this.tags = [];
  }

  onCancel() {
    console.log('cancel click!');
  }

}
