import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Question } from '../question.model';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/user/user.model';
import { selectUser } from '../../auth/store/auth.selectors';
import { AuthState } from '../../auth/store/auth.reducers';
import { QuestionState } from '../store/question.reducers';
import * as QuestionActions from '../store/question.actions';

@Component({
  selector: 'app-question-new',
  templateUrl: './question-new.component.html',
  styleUrls: ['./question-new.component.scss']
})
export class QuestionNewComponent implements OnInit, OnDestroy {
  // @ViewChild('newQuestionPanel') newQuestionPanel: MatExpansionPanel;
  user: User;
  visible = true;
  selectable = true;
  removable = true;  //delete current tag
  addOnBlur = true;
  tags: string[] = [];
  
  questionForm = new FormGroup({
    questionTitle: new FormControl(''),
    questionContent: new FormControl(''),
    tag: new FormControl('')
  });

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  private ngUnsubscribe$ = new Subject();

  constructor(
    private authStore: Store<AuthState>,
    private questionStore: Store<QuestionState>,
    private authService: AuthService,
    // private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.authStore.select(selectUser)
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

    if (this.authService.isAuthenticated) {
      this.questionStore.dispatch(QuestionActions.onCreateQuestion({ question: newQuestion }));
      this.questionForm.reset('');
      this.tags = [];

    } else {
      this.authService.toSignin();
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
