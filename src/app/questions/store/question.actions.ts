import { Action } from '@ngrx/store';
import { Question } from '../question.model';

export enum ActionTypes {
    GetPopularQuestions = '[Question Component] Get Popular Questions'
}

export class GetPopularQuestions implements Action {
    readonly type = ActionTypes.GetPopularQuestions;
    constructor(private payload: Question[]){}
}

export type Union = GetPopularQuestions;