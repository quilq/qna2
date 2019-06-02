import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatExpansionPanel } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Question } from '../question.model';
import { QuestionState } from '../store/question.reducers';
import { UserService } from '../../auth/user/user.service';
import { User } from '../../auth/user/user.model';
import { isAuthenticated, selectUser } from '../../auth/store/auth.selectors';
import * as QuestionActions from '../store/question.actions';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss']
})
export class NewQuestionComponent implements OnInit, OnDestroy {

  private ngUnsubscribe$ = new Subject();

  @ViewChild('newQuestionPanel') newQuestionPanel: MatExpansionPanel;

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
    this.store.select(isAuthenticated)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);

    this.store.select(selectUser)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(user => this.user = user);
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
      this.questionForm.reset('');
      this.tags = [];
      this.newQuestionPanel.close();

    } else {
      //TODO: ALERT
      console.log('sign in to continue !');
      this.userService.toSignin();
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
