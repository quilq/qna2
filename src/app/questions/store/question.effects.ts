import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators'

import { Question } from '../question.model';
import { QuestionsService } from '../questions.service';
import * as QuestionActions from './question.actions';

@Injectable()
export class QuestionEffects {

    @Effect()
    getQuestions$ = this.actions$
        .pipe(
            ofType(QuestionActions.ActionTypes.OnGetPopularQuestions),
            switchMap(() => {
                return this.questionService.getPopularQuestions()
                    .pipe(
                        map((questions: Question[]) => {
                            return new QuestionActions.GetPopularQuestions({ questions });
                        }),
                        //catchError()
                    )
            })
        );

    @Effect()
    findQuestionById$ = this.actions$
        .pipe(
            ofType(QuestionActions.ActionTypes.OnFindQuestionById),
            switchMap((action: QuestionActions.OnFindQuestionById) => {
                return this.questionService.findQuestionById(action.payload.id)
                    .pipe(
                        map((question: Question) => {
                            if (question) {
                                return new QuestionActions.FindQuestionById({ question });
                            }
                        }),
                        //catchError()
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
                                return new QuestionActions.FindQuestionsByTag({ tag: action.payload.tag, questions });
                            }
                        }),
                        //catchError()
                    )
            })
        );

    @Effect()
    createQuestion$ = this.actions$
        .pipe(
            ofType(QuestionActions.ActionTypes.OnCreateQuestion),
            switchMap((action: QuestionActions.OnCreateQuestion) => {
                return this.questionService.createQuestion(action.payload.question)
                    .pipe(
                        map((question: Question) => {
                            if (question) {
                                return new QuestionActions.CreateQuestion({ question });
                            }
                        }),
                        //catchError()
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
                        //catchError()
                    )
            })
        );

    @Effect()
    voteQuestion$ = this.actions$
        .pipe(
            ofType(QuestionActions.ActionTypes.OnVoteQuestion),
            switchMap((action: QuestionActions.VoteQuestion) => {
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
                        //catchError()
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
                        //catchError()
                    )
            })
        );

    constructor(private actions$: Actions, private questionService: QuestionsService) { }
}