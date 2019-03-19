import { Action } from '@ngrx/store';
import { Question } from '../question.model';

export enum ActionTypes {
    OnGetPopularQuestions = '[Question] On Get Popular Questions',
    GetPopularQuestions = '[Question] Get Popular Questions',

    findQuestionById = '[Question] Find Question By Id',
    findQuestionsByTag = '[Question] Find Question By Tag',
    createQuestion = '[Question] Create Question',
    editQuestion = '[Question] Edit Question',
    voteQuestion = '[Question] Vote Question',
    deleteQuestion = '[Question] Delete Question',
    
    addAnswer = '[Answer] Add Answer',
    editAnswer = '[Answer] Edit Answer',
    updateCorrectAnswer = '[Answer] Update Correct Answer',
    voteAnswer = '[Answer] Vote Answer',
    deleteAnswer = '[Answer] Delete Answer'
}

export class OnGetPopularQuestions implements Action {
    readonly type = ActionTypes.OnGetPopularQuestions;
}

export class GetPopularQuestions implements Action {
    readonly type = ActionTypes.GetPopularQuestions;
    constructor(public payload: Question[]){}
}

export type Union = OnGetPopularQuestions | GetPopularQuestions;