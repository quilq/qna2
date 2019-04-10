import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, tap } from 'rxjs/operators'
import { EMPTY, Observable } from 'rxjs';
import { Action } from '@ngrx/store';

import { Question } from '../question.model';
import { QuestionsService } from '../questions.service';
import * as QuestionActions from './question.actions';

@Injectable()
export class QuestionEffects {

    @Effect()
    getQuestions$: Observable<Action> = this.actions$
        .pipe(
            ofType(QuestionActions.ActionTypes.OnGetPopularQuestions),
            switchMap(() => {
                return this.questionService.getPopularQuestions()
                    .pipe(
                        map((questions: Question[]) => {
                            return new QuestionActions.GetPopularQuestions({ questions });
                        }),
                        catchError(() => EMPTY)
                    )
            })
        );

    @Effect()
    findQuestionById$ = this.actions$
        .pipe(
            ofType(QuestionActions.ActionTypes.OnFindQuestionById),
            tap(() => console.log('findQuestionById effect called 1')),
            switchMap((action: QuestionActions.OnFindQuestionById) => {
                console.log('findQuestionById effect called 2');
                return this.questionService.findQuestionById(action.payload.id)
                    .pipe(
                        tap(() => console.log('findQuestionById effect called 3')),
                        map((question: Question) => {
                            if (question) {
                                return new QuestionActions.FindQuestionById({ question });
                            }
                        }),
                        catchError(() => EMPTY)
                    )
            })
        );

    @Effect()
    findQuestionsByTag$ = this.actions$
        .pipe(
            ofType(QuestionActions.ActionTypes.OnFindQuestionsByTag),
            switchMap((action: QuestionActions.OnFindQuestionsByTag) => {
                return this.questionService.findQuestionsByTag(action.payload.tag)
                    .pipe(
                        map((questions: Question[]) => {
                            if (questions) {
                                return new QuestionActions.FindQuestionsByTag({
                                    tag: action.payload.tag,
                                    questions
                                });
                            }
                        }),
                        catchError(() => EMPTY)
                    )
            })
        );

    @Effect()
    createQuestion$ = this.actions$
        .pipe(
            ofType(QuestionActions.ActionTypes.OnCreateQuestion),
            switchMap((action: QuestionActions.OnCreateQuestion) => {
                console.log('action payload', action.payload);
                return this.questionService.createQuestion(action.payload.question)
                    .pipe(
                        map((question: Question) => {
                            console.log('create question effects ', question);
                            if (question) {
                                return new QuestionActions.CreateQuestion({ question });
                            }
                        }),
                        catchError(() => EMPTY)
                    )
            })
        );

    @Effect()
    editQuestion$ = this.actions$
        .pipe(
            ofType(QuestionActions.ActionTypes.OnEditQuestion),
            switchMap((action: QuestionActions.OnEditQuestion) => {
                return this.questionService.editQuestion(action.payload.questionId, action.payload.newQuestion)
                    .pipe(
                        map((response: string) => {
                            if (response === 'question-updated') {
                                return new QuestionActions.EditQuestion({
                                    questionId: action.payload.questionId,
                                    newQuestion: action.payload.newQuestion
                                });
                            }
                        }),
                        catchError(() => EMPTY)
                    )
            })
        );

    @Effect()
    voteQuestion$ = this.actions$
        .pipe(
            ofType(QuestionActions.ActionTypes.OnVoteQuestion),
            switchMap((action: QuestionActions.OnVoteQuestion) => {
                return this.questionService.voteQuestion(action.payload.questionId, action.payload.upvote)
                    .pipe(
                        map((response: string) => {
                            if (response === 'question-voted') {
                                return new QuestionActions.VoteQuestion({
                                    questionId: action.payload.questionId,
                                    upvote: action.payload.upvote
                                });
                            }
                        }),
                        catchError(() => EMPTY)
                    )
            })
        );

    @Effect()
    deleteQuestion$ = this.actions$
        .pipe(
            ofType(QuestionActions.ActionTypes.OnDeleteQuestion),
            switchMap((action: QuestionActions.OnDeleteQuestion) => {
                return this.questionService.deleteQuestion(action.payload.questionId)
                    .pipe(
                        map((response: string) => {
                            if (response === 'question-voted') {
                                return new QuestionActions.DeleteQuestion({
                                    questionId: action.payload.questionId,
                                });
                            }
                        }),
                        catchError(() => EMPTY)
                    )
            })
        );

    @Effect()
    addAnswer$ = this.actions$
        .pipe(
            ofType(QuestionActions.ActionTypes.OnAddAnswer),
            switchMap((action: QuestionActions.OnAddAnswer) => {
                return this.questionService.addAnswer(action.payload.questionId, action.payload.newAnswer)
                    .pipe(
                        map((response: string) => {
                            if (response === 'answer-added') {
                                return new QuestionActions.AddAnswer({
                                    questionId: action.payload.questionId,
                                    newAnswer: action.payload.newAnswer
                                });
                            }
                        }),
                        catchError(() => EMPTY)
                    )
            })
        );

    @Effect()
    editAnswer$ = this.actions$
        .pipe(
            ofType(QuestionActions.ActionTypes.OnEditAnswer),
            switchMap((action: QuestionActions.OnEditAnswer) => {
                return this.questionService.editAnswer(
                    action.payload.questionId,
                    action.payload.answerId,
                    action.payload.newAnswer
                )
                    .pipe(
                        map((response: string) => {
                            if (response === 'answer-edited') {
                                return new QuestionActions.EditAnswer({
                                    questionId: action.payload.questionId,
                                    answerId: action.payload.answerId,
                                    newAnswer: action.payload.newAnswer
                                });
                            }
                        }),
                        catchError(() => EMPTY)
                    )
            })
        );

    @Effect()
    updateCorrectAnswer$ = this.actions$
        .pipe(
            ofType(QuestionActions.ActionTypes.OnUpdateCorrectAnswer),
            switchMap((action: QuestionActions.UpdateCorrectAnswer) => {
                return this.questionService.updateCorrectAnswer(
                    action.payload.questionId,
                    action.payload.correctAnswerId
                )
                    .pipe(
                        map((response: string) => {
                            if (response === 'correct-answer-updated') {
                                return new QuestionActions.UpdateCorrectAnswer({
                                    questionId: action.payload.questionId,
                                    correctAnswerId: action.payload.correctAnswerId
                                });
                            }
                        }),
                        catchError(() => EMPTY)
                    )
            })
        );

    @Effect()
    voteAnswer$ = this.actions$
        .pipe(
            ofType(QuestionActions.ActionTypes.OnVoteAnswer),
            switchMap((action: QuestionActions.OnVoteAnswer) => {
                return this.questionService.voteAnswer(
                    action.payload.questionId,
                    action.payload.answerId,
                    action.payload.upvote
                )
                    .pipe(
                        map((response: string) => {
                            if (response === 'answer-voted') {
                                return new QuestionActions.VoteAnswer({
                                    questionId: action.payload.questionId,
                                    answerId: action.payload.answerId,
                                    upvote: action.payload.upvote
                                });
                            }
                        }),
                        catchError(() => EMPTY)
                    )
            })
        );

    @Effect()
    deleteAnswer$ = this.actions$
        .pipe(
            ofType(QuestionActions.ActionTypes.OnDeleteAnswer),
            switchMap((action: QuestionActions.OnDeleteAnswer) => {
                return this.questionService.deleteAnswer(
                    action.payload.questionId,
                    action.payload.answerId
                )
                    .pipe(
                        map((response: string) => {
                            if (response === 'answer-deleted') {
                                return new QuestionActions.DeleteAnswer({
                                    questionId: action.payload.questionId,
                                    answerId: action.payload.answerId
                                });
                            }
                        }),
                        catchError(() => EMPTY)
                    )
            })
        );
    constructor(private actions$: Actions, private questionService: QuestionsService) { }
}