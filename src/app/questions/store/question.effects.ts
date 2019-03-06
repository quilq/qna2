import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { QuestionsService } from '../questions.service';
import {switchMap, map} from 'rxjs/operators'

import * as QuestionActions from './question.actions';
import { Question } from '../question.model';

@Injectable()
export class QuestionEffects {

    @Effect()
    getQuestions$ = this.actions$.pipe(
        ofType(QuestionActions.ActionTypes.GetPopularQuestions),
        switchMap(()=> {
            return this.questionService.getQuestions()
            .pipe(
                map((questions: Question[]) => {
                    return new QuestionActions.GetPopularQuestions(questions);
                })
            )
        })
    )

    constructor(private actions$: Actions, private questionService: QuestionsService){}
}