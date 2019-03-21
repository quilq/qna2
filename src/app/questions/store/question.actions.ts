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

    //to implement
    OnEditQuestion = '[Question] On Edit Question',
    EditQuestion = '[Question] Edit Question',

    //to implement
    OnVoteQuestion = '[Question] On Vote Question',
    VoteQuestion = '[Question] Vote Question',

    //to implement
    OnDeleteQuestion = '[Question] On Delete Question',
    DeleteQuestion = '[Question] Delete Question',

    OnAddAnswer = '[Answer] On Add Answer',
    AddAnswer = '[Answer] Add Answer',

    //to implement
    OnEditAnswer = '[Answer] On Edit Answer',
    EditAnswer = '[Answer] Edit Answer',

    //to implement
    OnUpdateCorrectAnswer = '[Answer] On Update Correct Answer',
    UpdateCorrectAnswer = '[Answer] Update Correct Answer',

    //to implement
    OnVoteAnswer = '[Answer] On Vote Answer',
    VoteAnswer = '[Answer] Vote Answer',

    //to implement
    OnDeleteAnswer = '[Answer] On Delete Answer',
    DeleteAnswer = '[Answer] Delete Answer'
}

export class OnGetPopularQuestions implements Action {
    readonly type = ActionTypes.OnGetPopularQuestions;
}

export class GetPopularQuestions implements Action {
    readonly type = ActionTypes.GetPopularQuestions;
    constructor(public payload: { questions: Question[] }) { }
}

export class OnFindQuestionById implements Action {
    readonly type = ActionTypes.OnFindQuestionById;
    constructor(public payload: { id: string }) { }
}

export class FindQuestionById implements Action {
    readonly type = ActionTypes.FindQuestionById;
    constructor(public payload: { question: Question }) { }
}

export class OnFindQuestionsByTag implements Action {
    readonly type = ActionTypes.OnFindQuestionsByTag;
    constructor(public payload: { tag: string }) { }
}

export class FindQuestionsByTag implements Action {
    readonly type = ActionTypes.FindQuestionsByTag;
    constructor(public payload: { tag: string, questions: Question[] }) { }
}

export class OnCreateQuestion implements Action {
    readonly type = ActionTypes.OnCreateQuestion;
    constructor(public payload: { question: Question }) { }
}

export class CreateQuestion implements Action {
    readonly type = ActionTypes.CreateQuestion;
    constructor(public payload: { question: Question }) { }
}

export class OnAddAnswer implements Action {
    readonly type = ActionTypes.OnAddAnswer;
    constructor(public payload: { questionId: string, newAnswer: string }) { }
}

export class AddAnswer implements Action {
    readonly type = ActionTypes.AddAnswer;
    constructor(public payload: { questionId: string, newAnswer: string }) { }
}

export type Union =
    | OnGetPopularQuestions
    | GetPopularQuestions
    | OnFindQuestionById
    | FindQuestionById
    | OnFindQuestionsByTag
    | FindQuestionsByTag
    | OnCreateQuestion
    | CreateQuestion
    | OnAddAnswer
    | AddAnswer;