import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators'
import { EMPTY, Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';

import { Question } from '../question.model';
import { QuestionsService } from '../questions.service';
import * as QuestionActions from './question.actions';

interface LoadedQuestions {
    totalQuestions: number,
    questions: Question[]
}

@Injectable()
export class QuestionEffects {

    @Effect()
    getPopularQuestions$: Observable<Action> = this.actions$
        .pipe(
            ofType(QuestionActions.ActionTypes.OnGetPopularQuestions),
            switchMap((action: QuestionActions.OnGetPopularQuestions) => {
                return this.questionService.getPopularQuestions(action.payload.next)
                    .pipe(
                        // map((loadedQuestions: LoadedQuestions) => {
                        map((loadedQuestions: any) => {
                            return new QuestionActions.GetPopularQuestions({
                                totalQuestions: loadedQuestions.totalQuestions[0].count,
                                questions: loadedQuestions.questions
                            });
                        }),
                        catchError((error) => {
                            console.log('Error (getPopularQuestions effect): ', error);
                            return EMPTY;
                        })
                    )
            })
        );

    @Effect()
    getRecentQuestions$: Observable<Action> = this.actions$
        .pipe(
            ofType(QuestionActions.ActionTypes.OnGetRecentQuestions),
            switchMap((action: QuestionActions.OnGetRecentQuestions) => {
                return this.questionService.getRecentQuestions(action.payload.next)
                    .pipe(
                        map((loadedQuestions: any) => {
                            return new QuestionActions.GetRecentQuestions({
                                totalQuestions: loadedQuestions.totalQuestions[0].count,
                                questions: loadedQuestions.questions
                            });
                        }),
                        catchError((error) => {
                            console.log('Error (getRecentQuestions effect): ', error);
                            return EMPTY;
                        })
                    )
            })
        );

    @Effect()
    getRelatedQuestions$: Observable<Action> = this.actions$
        .pipe(
            ofType(QuestionActions.ActionTypes.OnGetRelatedQuestions),
            switchMap((action: QuestionActions.OnGetRelatedQuestions) => {
                return this.questionService.getRelatedQuestions(action.payload.tags)
                    .pipe(
                        map((questions: Question[]) => {
                            return new QuestionActions.GetRelatedQuestions({ questions });
                        }),
                        catchError((error) => {
                            console.log('Error (getRelatedQuestions effect)', error);
                            return EMPTY;
                        })
                    )
            })
        );

    @Effect()
    getFeaturedQuestions$: Observable<Action> = this.actions$
        .pipe(
            ofType(QuestionActions.ActionTypes.OnGetFeaturedQuestions),
            switchMap(() => {
                return this.questionService.getFeaturedQuestions()
                    .pipe(
                        map((questions: Question[]) => {
                            return new QuestionActions.GetFeaturedQuestions({ questions });
                        }),
                        catchError((error) => {
                            console.log('Error (getFeaturedQuestions effect): ', error);
                            return EMPTY;
                        })
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
                        catchError((error) => {
                            console.log('Error (findQuestionById effect): ', error);
                            return EMPTY;
                        })
                    )
            })
        );

    @Effect()
    getUnansweredQuestions$ = this.actions$
        .pipe(
            ofType(QuestionActions.ActionTypes.OnGetUnansweredQuestions),
            switchMap((action: QuestionActions.OnGetUnansweredQuestions) => {
                return this.questionService.getUnansweredQuestions(action.payload.next)
                    .pipe(
                        map((loadedQuestions: any) => {
                            return new QuestionActions.GetUnansweredQuestions({
                                totalQuestions: loadedQuestions.totalQuestions[0].count,
                                questions: loadedQuestions.questions
                            });
                        }),
                        catchError((error) => {
                            console.log('Error (getUnansweredQuestions effect): ', error);
                            return EMPTY;
                        })
                    )
            })
        )

    @Effect()
    getTags$ = this.actions$
        .pipe(
            ofType(QuestionActions.ActionTypes.OnGetTags),
            switchMap(() => {
                return this.questionService.getTags()
                    .pipe(
                        map((tags: string[]) => {
                            if (tags) {
                                return new QuestionActions.GetTags({ tags });
                            }
                        }),
                        catchError((error) => {
                            console.log('Error (getTags effect): ', error);
                            return EMPTY;
                        })
                    )
            })
        )

    @Effect()
    findQuestionsByTag$ = this.actions$
        .pipe(
            ofType(QuestionActions.ActionTypes.OnFindQuestionsByTag),
            switchMap((action: QuestionActions.OnFindQuestionsByTag) => {
                return this.questionService.findQuestionsByTag(action.payload.tag, action.payload.next)
                    .pipe(
                        map((questions: Question[]) => {
                            if (questions) {
                                return new QuestionActions.FindQuestionsByTag({
                                    tag: action.payload.tag,
                                    questions
                                });
                            }
                        }),
                        catchError((error) => {
                            console.log('Error (findQuestionsByTag effect): ', error);
                            return EMPTY;
                        })
                    )
            })
        );


    @Effect()
    findQuestionsByKeywords$ = this.actions$
        .pipe(
            ofType(QuestionActions.ActionTypes.OnFindQuestionsByKeywords),
            switchMap((action: QuestionActions.OnFindQuestionsByKeywords) => {
                return this.questionService.findQuestionsByKeywords(action.payload.keywords, action.payload.next)
                    .pipe(
                        map((questions: Question[]) => {
                            if (questions) {
                                return new QuestionActions.FindQuestionsByKeywords({
                                    keywords: action.payload.keywords,
                                    questions
                                });
                            }
                        }),
                        catchError((error) => {
                            console.log('Error (findQuestionsByKeywords effect): ', error);
                            return EMPTY;
                        })
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
                            if (question) {
                                return new QuestionActions.CreateQuestion({ question });
                            }
                        }),
                        catchError((error) => {
                            console.log('Error (createQuestion effect): ', error);
                            return EMPTY;
                        })
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
                        mergeMap((response: string) => {
                            if (response === 'question-updated') {
                                return [
                                    new QuestionActions.EditQuestion({
                                        questionId: action.payload.questionId,
                                        newQuestion: action.payload.newQuestion
                                    }),
                                    new QuestionActions.OnFindQuestionById({ id: action.payload.questionId })
                                ];
                            }
                        }),
                        catchError((error) => {
                            console.log('Error (editQuestion effect): ', error);
                            return EMPTY;
                        })
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
                        mergeMap((response: string) => {
                            if (response === 'question-voted') {
                                return [
                                    new QuestionActions.VoteQuestion({
                                        questionId: action.payload.questionId,
                                        upvote: action.payload.upvote
                                    }),
                                    new QuestionActions.OnFindQuestionById({ id: action.payload.questionId })
                                ];
                            }
                        }),
                        catchError((error) => {
                            console.log('Error (voteQuestion effect): ', error);
                            return EMPTY;
                        })
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
                            if (response === 'question-deleted') {
                                this.router.navigate(['/']);
                                return new QuestionActions.DeleteQuestion({
                                    questionId: action.payload.questionId,
                                });
                            }
                        }),
                        catchError((error) => {
                            console.log('Error (deleteQuestion effect): ', error);
                            return EMPTY;
                        })
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
                        mergeMap((response: string) => {
                            console.log(response);
                            if (response === 'answer-added') {
                                return [
                                    new QuestionActions.AddAnswer({
                                        questionId: action.payload.questionId,
                                        newAnswer: action.payload.newAnswer
                                    }),
                                    new QuestionActions.OnFindQuestionById({ id: action.payload.questionId })
                                ];
                            }
                        }),
                        catchError((error) => {
                            console.log('Error (addAnswer effect): ', error);
                            return EMPTY;
                        })
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
                        mergeMap((response: string) => {
                            if (response === 'answer-edited') {
                                return [
                                    new QuestionActions.EditAnswer({
                                        questionId: action.payload.questionId,
                                        answerId: action.payload.answerId,
                                        newAnswer: action.payload.newAnswer
                                    }),
                                    new QuestionActions.OnFindQuestionById({ id: action.payload.questionId })
                                ];
                            }
                        }),
                        catchError((error) => {
                            console.log('Error (editAnswer effect): ', error);
                            return EMPTY;
                        })
                    )
            })
        );

    @Effect()
    updateCorrectAnswer$ = this.actions$
        .pipe(
            ofType(QuestionActions.ActionTypes.OnUpdateCorrectAnswer),
            switchMap((action: QuestionActions.OnUpdateCorrectAnswer) => {
                return this.questionService.updateCorrectAnswer(
                    action.payload.questionId,
                    action.payload.correctAnswerId,
                    action.payload.undo
                )
                    .pipe(
                        mergeMap((response: string) => {
                            if (response === 'correct-answer-updated') {
                                return [
                                    new QuestionActions.UpdateCorrectAnswer({ ...action.payload }),
                                    new QuestionActions.OnFindQuestionById({ id: action.payload.questionId })
                                ];
                            }
                        }),
                        catchError((error) => {
                            console.log('Error (updateCorrectAnswer effect) ', error);
                            return EMPTY;
                        })
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
                        mergeMap((response: string) => {
                            if (response === 'answer-voted') {
                                return [
                                    new QuestionActions.VoteAnswer({
                                        questionId: action.payload.questionId,
                                        answerId: action.payload.answerId,
                                        upvote: action.payload.upvote
                                    }),
                                    new QuestionActions.OnFindQuestionById({ id: action.payload.questionId })
                                ];
                            }
                        }),
                        catchError((error) => {
                            console.log('Error (voteAnswer effect): ', error);
                            return EMPTY;
                        })
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
                        mergeMap((response: string) => {
                            if (response === 'answer-deleted') {
                                return [
                                    new QuestionActions.DeleteAnswer({
                                        questionId: action.payload.questionId,
                                        answerId: action.payload.answerId
                                    }),
                                    new QuestionActions.OnFindQuestionById({ id: action.payload.questionId })
                                ];
                            }
                        }),
                        catchError((error) => {
                            console.log('Error (deleteAnswer effect): ', error);
                            return EMPTY;
                        })
                    )
            })
        );

    constructor(private actions$: Actions, private questionService: QuestionsService, private router: Router) { }
}