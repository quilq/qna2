import { Action } from '@ngrx/store';
import { Question } from '../question.model';

export enum ActionTypes {
    OnGetPopularQuestions = '[Question] On Get Popular Questions',
    GetPopularQuestions = '[Question] Get Popular Questions',

    OnFindQuestionById = '[Question] On Find Question By Id',
    FindQuestionById = '[Question] Find Question By Id',

    OnFindQuestionsByTag = '[Question] On Find Question By Tag',
    FindQuestionsByTag = '[Question] Find Question By Tag',

    OnCreateQuestion = '[Question] On Create Question',
    CreateQuestion = '[Question] Create Question',

    OnEditQuestion = '[Question] On Edit Question',
    EditQuestion = '[Question] Edit Question',

    OnVoteQuestion = '[Question] On Vote Question',
    VoteQuestion = '[Question] Vote Question',

    OnDeleteQuestion = '[Question] On Delete Question',
    DeleteQuestion = '[Question] Delete Question',

    OnAddAnswer = '[Answer] On Add Answer',
    AddAnswer = '[Answer] Add Answer',

    OnEditAnswer = '[Answer] On Edit Answer',
    EditAnswer = '[Answer] Edit Answer',

    OnUpdateCorrectAnswer = '[Answer] On Update Correct Answer',
    UpdateCorrectAnswer = '[Answer] Update Correct Answer',

    OnVoteAnswer = '[Answer] On Vote Answer',
    VoteAnswer = '[Answer] Vote Answer',

    OnDeleteAnswer = '[Answer] On Delete Answer',
    DeleteAnswer = '[Answer] Delete Answer'
}

export class OnGetPopularQuestions implements Action {
    readonly type = ActionTypes.OnGetPopularQuestions;
}

export class GetPopularQuestions implements Action {
    readonly type = ActionTypes.GetPopularQuestions;
    constructor(public payload: Question[]){}
}

export type Union = OnGetPopularQuestions | GetPopularQuestions;