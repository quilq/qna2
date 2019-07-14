import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, catchError, mergeMap } from 'rxjs/operators'
import { EMPTY } from 'rxjs';
import { Router } from '@angular/router';

import { Question } from '../question.model';
import { QuestionsService } from '../questions.service';
import * as QuestionActions from './question.actions';

@Injectable()
export class QuestionEffects {
    getPopularQuestions$ = createEffect(() => this.actions$.pipe(
        ofType(QuestionActions.onGetPopularQuestions),
        mergeMap(action => {
            return this.questionService.getPopularQuestions(action.next).pipe(
                map((loadedQuestions: any) => {
                    return QuestionActions.getPopularQuestions({
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
    ));

    getRecentQuestions$ = createEffect(() => this.actions$.pipe(
        ofType(QuestionActions.onGetRecentQuestions),
        mergeMap(action => {
            return this.questionService.getRecentQuestions(action.next).pipe(
                map((loadedQuestions: any) => {
                    return QuestionActions.getRecentQuestions({
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
    ));

    getRelatedQuestions$ = createEffect(() => this.actions$.pipe(
        ofType(QuestionActions.onGetRelatedQuestions),
        mergeMap(action => {
            return this.questionService.getRelatedQuestions(action.tags).pipe(
                map((questions: Question[]) => {
                    return QuestionActions.getRelatedQuestions({ questions });
                }),
                catchError((error) => {
                    console.log('Error (getRelatedQuestions effect)', error);
                    return EMPTY;
                })
            )
        })
    ));

    getFeaturedQuestions$ = createEffect(() => this.actions$.pipe(
        ofType(QuestionActions.onGetFeaturedQuestions),
        mergeMap(() => {
            return this.questionService.getFeaturedQuestions().pipe(
                map((questions: Question[]) => {
                    return QuestionActions.getFeaturedQuestions({ questions });
                }),
                catchError((error) => {
                    console.log('Error (getFeaturedQuestions effect): ', error);
                    return EMPTY;
                })
            )
        })
    ));

    findQuestionById$ = createEffect(() => this.actions$.pipe(
        ofType(QuestionActions.onFindQuestionById),
        mergeMap(action => {
            return this.questionService.findQuestionById(action.id).pipe(
                map((question: Question) => {
                    if (question) {
                        return QuestionActions.findQuestionById({ question });
                    }
                }),
                catchError((error) => {
                    console.log('Error (findQuestionById effect): ', error);
                    return EMPTY;
                })
            )
        })
    ));

    getUnansweredQuestions$ = createEffect(() => this.actions$.pipe(
        ofType(QuestionActions.onGetUnansweredQuestions),
        mergeMap(action => {
            return this.questionService.getUnansweredQuestions(action.next).pipe(
                map((loadedQuestions: any) => {
                    return QuestionActions.getUnansweredQuestions({
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
    ));

    getTags$ = createEffect(() => this.actions$.pipe(
        ofType(QuestionActions.onGetTags),
        mergeMap(() => {
            return this.questionService.getTags().pipe(
                map((tags: string[]) => {
                    if (tags) {
                        return QuestionActions.getTags({ tags });
                    }
                }),
                catchError((error) => {
                    console.log('Error (getTags effect): ', error);
                    return EMPTY;
                })
            )
        })
    ));

    findQuestionsByTag$ = createEffect(() => this.actions$.pipe(
        ofType(QuestionActions.onFindQuestionsByTag),
        mergeMap(action => {
            return this.questionService.findQuestionsByTag(action.tag, action.next).pipe(
                map((questions: Question[]) => {
                    if (questions) {
                        return QuestionActions.findQuestionsByTag({
                            tag: action.tag,
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
    ));

    findQuestionsByKeywords$ = createEffect(() => this.actions$.pipe(
        ofType(QuestionActions.onFindQuestionsByKeywords),
        mergeMap((action) => {
            return this.questionService.findQuestionsByKeywords(action.keywords, action.next).pipe(
                map((questions: Question[]) => {
                    return QuestionActions.findQuestionsByKeywords({
                        keywords: action.keywords,
                        questions
                    });
                }),
                catchError((error) => {
                    console.log('Error (findQuestionsByKeywords effect): ', error);
                    return EMPTY;
                })
            )
        })
    ));

    createQuestion$ = createEffect(() => this.actions$
        .pipe(
            ofType(QuestionActions.onCreateQuestion),
            mergeMap((action) => {
                return this.questionService.createQuestion(action.question)
                    .pipe(
                        map((question: Question) => {
                            return QuestionActions.createQuestion({ question });
                        }),
                        catchError((error) => {
                            console.log('Error (createQuestion effect): ', error);
                            return EMPTY;
                        })
                    )
            })
        ));

    editQuestion$ = createEffect(() => this.actions$.pipe(
        ofType(QuestionActions.onEditQuestion),
        mergeMap(action => {
            return this.questionService.editQuestion(action.questionId, action.newQuestionContent).pipe(
                mergeMap((question: Question) => {
                    return [
                        QuestionActions.editQuestion({ question }),
                        QuestionActions.onFindQuestionById({ id: action.questionId })
                    ];
                }),
                catchError((error) => {
                    console.log('Error (editQuestion effect): ', error);
                    return EMPTY;
                })
            )
        })
    ));

    voteQuestion$ = createEffect(() => this.actions$.pipe(
        ofType(QuestionActions.onVoteQuestion),
        mergeMap(action => {
            return this.questionService.voteQuestion(action.questionId, action.upvote).pipe(
                mergeMap((question: Question) => {
                    return [
                        QuestionActions.voteQuestion({ question }),
                        QuestionActions.onFindQuestionById({ id: action.questionId })
                    ];
                }),
                catchError((error) => {
                    console.log('Error (voteQuestion effect): ', error);
                    return EMPTY;
                })
            )
        })
    ));

    deleteQuestion$ = createEffect(() => this.actions$.pipe(
        ofType(QuestionActions.onDeleteQuestion),
        mergeMap(action => {
            return this.questionService.deleteQuestion(action.questionId).pipe(
                map((question: Question) => {
                    this.router.navigate(['/']);
                    return QuestionActions.deleteQuestion({ question });
                }),
                catchError((error) => {
                    console.log('Error (deleteQuestion effect): ', error);
                    return EMPTY;
                })
            )
        })
    ));

    addAnswer$ = createEffect(() => this.actions$.pipe(
        ofType(QuestionActions.onAddAnswer),
        mergeMap(action => {
            return this.questionService.addAnswer(action.questionId, action.newAnswer).pipe(
                mergeMap((question: Question) => {
                    return [
                        QuestionActions.addAnswer({ question }),
                        QuestionActions.onFindQuestionById({ id: action.questionId })
                    ];
                }),
                catchError((error) => {
                    console.log('Error (addAnswer effect): ', error);
                    return EMPTY;
                })
            )
        })
    ));

    editAnswer$ = createEffect(() => this.actions$.pipe(
        ofType(QuestionActions.onEditAnswer),
        mergeMap(action => {
            return this.questionService.editAnswer(
                action.questionId,
                action.answerId,
                action.newAnswer
            ).pipe(
                mergeMap((question: Question) => {
                    return [
                        QuestionActions.editAnswer({ question }),
                        QuestionActions.onFindQuestionById({ id: action.questionId })
                    ];
                }),
                catchError((error) => {
                    console.log('Error (editAnswer effect): ', error);
                    return EMPTY;
                })
            )
        })
    ));

    updateCorrectAnswer$ = createEffect(() => this.actions$.pipe(
        ofType(QuestionActions.onUpdateCorrectAnswer),
        mergeMap(action => {
            return this.questionService.updateCorrectAnswer(
                action.questionId,
                action.correctAnswerId,
                action.undo
            ).pipe(
                mergeMap((question: Question) => {
                    return [
                        QuestionActions.updateCorrectAnswer({ question }),
                        QuestionActions.onFindQuestionById({ id: action.questionId })
                    ];
                }),
                catchError((error) => {
                    console.log('Error (updateCorrectAnswer effect) ', error);
                    return EMPTY;
                })
            )
        })
    ));

    voteAnswer$ = createEffect(() => this.actions$.pipe(
        ofType(QuestionActions.onVoteAnswer),
        mergeMap(action => {
            return this.questionService.voteAnswer(
                action.questionId,
                action.answerId,
                action.upvote
            ).pipe(
                mergeMap((question: Question) => {
                    return [
                        QuestionActions.voteAnswer({ question }),
                        QuestionActions.onFindQuestionById({ id: action.questionId })
                    ];
                }),
                catchError((error) => {
                    console.log('Error (voteAnswer effect): ', error);
                    return EMPTY;
                })
            )
        })
    ));

    deleteAnswer$ = createEffect(() => this.actions$.pipe(
        ofType(QuestionActions.onDeleteAnswer),
        mergeMap(action => {
            return this.questionService.deleteAnswer(
                action.questionId,
                action.answerId
            ).pipe(
                mergeMap((question: Question) => {
                    return [
                        QuestionActions.deleteAnswer({ question }),
                        QuestionActions.onFindQuestionById({ id: action.questionId })
                    ];
                }),
                catchError((error) => {
                    console.log('Error (deleteAnswer effect): ', error);
                    return EMPTY;
                })
            )
        })
    ));

    constructor(private actions$: Actions, private questionService: QuestionsService, private router: Router) { }
}