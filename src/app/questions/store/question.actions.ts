import { Action } from '@ngrx/store';
import { Question } from '../question.model';

export enum ActionTypes {
    OnGetPopularQuestions = '[Question Component] On Get Popular Questions',
    GetPopularQuestions = '[Question Component] Get Popular Questions'
}

export class OnGetPopularQuestions implements Action {
    readonly type = ActionTypes.OnGetPopularQuestions;
}

export class GetPopularQuestions implements Action {
    readonly type = ActionTypes.GetPopularQuestions;
    constructor(public payload: Question[]){}
}

export type Union = OnGetPopularQuestions | GetPopularQuestions;