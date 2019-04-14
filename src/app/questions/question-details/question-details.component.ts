import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { Question, Answer } from '../question.model';
import { QuestionState } from '../store/question.reducers';
import { getQuestionById } from '../store/question.selectors';
import { User } from '../../auth/user/user.model';
import { selectUser, isAuthenticated } from '../../auth/store/auth.selectors';
import { UserService } from '../../auth/user/user.service';
import * as QuestionActions from '../store/question.actions';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.scss']
})
export class QuestionDetailsComponent implements OnInit {

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
    private activatedRoute: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    this.questionStore.dispatch(new QuestionActions.OnFindQuestionById({ id }));

    this.questionStore.select(getQuestionById).subscribe(question => this.question = question);

    this.userStore.select(selectUser).subscribe(user => this.user = user);

    this.userStore.select(isAuthenticated).subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
  }

  onSubmit() {
    if (!isAuthenticated) {
      this.userService.toSignin();
    } else {
      let newAnswer = new Answer(this.answerForm.value.newAnswer, this.user);
      console.log(newAnswer);

      this.questionStore.dispatch(new QuestionActions.OnAddAnswer({
        questionId: this.question._id,
        newAnswer: newAnswer
      }));
    }
  }

  onEditQuestion(){
    this.canEditQuestion = true;
  }

  onCancelEditQuestion(){
    this.canEditQuestion = false;
  }

  editQuestion(questionId: string, newQuestion: string){
    if (!isAuthenticated) {
      this.userService.toSignin();
    } else {
      this.questionStore.dispatch(new QuestionActions.OnEditQuestion({questionId, newQuestion}));
      this.onCancelEditQuestion();
    }
  }

  onEditAnswer(){
    this.canEditAnswer = true;
  }

  onCancelEditAnswer(){
    this.canEditAnswer = false;
  }

  editAnswer(questionId: string, answerId: string, newAnswer: string){
    if (!isAuthenticated) {
      this.userService.toSignin();
    } else {
      this.questionStore.dispatch(new QuestionActions.OnEditAnswer({questionId, answerId, newAnswer}));
      this.onCancelEditAnswer();
    }
  }

  deleteQuestion(questionId: string) {
    if (!isAuthenticated) {
      this.userService.toSignin();
    } else {
      this.questionStore.dispatch(new QuestionActions.OnDeleteQuestion({ questionId }));
    }
  }

  voteQuestion(questionId: string, upvote: boolean) {
    if (!isAuthenticated) {
      this.userService.toSignin();
    } else {
      this.questionStore.dispatch(new QuestionActions.OnVoteQuestion({ questionId, upvote }));
    }
  }

  deleteAnswer(questionId: string, answerId: string){
    this.questionStore.dispatch(new QuestionActions.OnDeleteAnswer({questionId, answerId}));
  }

  voteAnswer(questionId: string, answerId: string, upvote: boolean){
    this.questionStore.dispatch(new QuestionActions.OnVoteAnswer({questionId, answerId, upvote}));
  }

  updateCorrectAnswer(questionId: string, correctAnswerId: string){
    this.questionStore.dispatch(new QuestionActions.OnUpdateCorrectAnswer({questionId, correctAnswerId}));
  }
}
