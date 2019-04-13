import { Action } from '@ngrx/store';

import { Question, Answer } from '../question.model';

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

export class OnEditQuestion implements Action {
    readonly type = ActionTypes.OnEditQuestion;
    constructor(public payload: { questionId: string, newQuestion: string }) { }
}

export class EditQuestion implements Action {
    readonly type = ActionTypes.EditQuestion;
    constructor(public payload: { questionId: string, newQuestion: string }) { }
}

export class OnDeleteQuestion implements Action {
    readonly type = ActionTypes.OnDeleteQuestion;
    constructor(public payload: { questionId: string }) { }
}

export class DeleteQuestion implements Action {
    readonly type = ActionTypes.DeleteQuestion;
    constructor(public payload: { questionId: string }) { }
}

export class OnVoteQuestion implements Action {
    readonly type = ActionTypes.OnVoteQuestion;
    constructor(public payload: { questionId: string, upvote: boolean }) { }
}

export class VoteQuestion implements Action {
    readonly type = ActionTypes.VoteQuestion;
    constructor(public payload: { questionId: string, upvote: boolean }) { }
}

export class OnAddAnswer implements Action {
    readonly type = ActionTypes.OnAddAnswer;
    constructor(public payload: { questionId: string, newAnswer: Answer }) { }
}

export class AddAnswer implements Action {
    readonly type = ActionTypes.AddAnswer;
    constructor(public payload: { questionId: string, newAnswer: Answer }) { }
}

export class OnEditAnswer implements Action {
    readonly type = ActionTypes.OnEditAnswer;
    constructor(public payload: { questionId: string, answerId: string, newAnswer: Answer }) { }
}

export class EditAnswer implements Action {
    readonly type = ActionTypes.EditAnswer;
    constructor(public payload: { questionId: string, answerId: string, newAnswer: Answer }) { }
}

export class OnUpdateCorrectAnswer implements Action {
    readonly type = ActionTypes.OnUpdateCorrectAnswer;
    constructor(public payload: { questionId: string, correctAnswerId: string }) { }
}

export class UpdateCorrectAnswer implements Action {
    readonly type = ActionTypes.UpdateCorrectAnswer;
    constructor(public payload: { questionId: string, correctAnswerId: string }) { }
}

export class OnVoteAnswer implements Action {
    readonly type = ActionTypes.OnVoteAnswer;
    constructor(public payload: { questionId: string, answerId: string, upvote: boolean }) { }
}

export class VoteAnswer implements Action {
    readonly type = ActionTypes.VoteAnswer;
    constructor(public payload: { questionId: string, answerId: string, upvote: boolean }) { }
}

export class OnDeleteAnswer implements Action {
    readonly type = ActionTypes.OnDeleteAnswer;
    constructor(public payload: { questionId: string, answerId: string }) { }
}

export class DeleteAnswer implements Action {
    readonly type = ActionTypes.DeleteAnswer;
    constructor(public payload: { questionId: string, answerId: string }) { }
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
    | OnEditQuestion
    | EditQuestion
    | OnDeleteQuestion
    | DeleteQuestion
    | OnVoteQuestion
    | VoteQuestion
    | OnAddAnswer
    | AddAnswer
    | OnEditAnswer
    | EditAnswer
    | OnUpdateCorrectAnswer
    | UpdateCorrectAnswer
    | OnVoteAnswer
    | VoteAnswer
    | OnDeleteAnswer
    | DeleteAnswer;