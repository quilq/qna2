import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {switchMap, map} from 'rxjs/operators'

import { Question } from '../question.model';
import { QuestionsService } from '../questions.service';
import * as QuestionActions from './question.actions';

@Injectable()
export class QuestionEffects {

    @Effect()
    getQuestions$ = this.actions$.pipe(
        ofType(QuestionActions.ActionTypes.OnGetPopularQuestions),
        switchMap(()=> {
            return this.questionService.GetPopularQuestions()
            .pipe(
                map((questions: Question[]) => {
                    return new QuestionActions.GetPopularQuestions(questions);
                })
            )
        })
    )

    constructor(private actions$: Actions, private questionService: QuestionsService){}
}