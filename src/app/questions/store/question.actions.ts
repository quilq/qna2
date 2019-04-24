import { Action } from '@ngrx/store';

import { Question, Answer } from '../question.model';

export enum ActionTypes {
    OnGetPopularQuestions = '[Question] On Get Popular Questions',
    GetPopularQuestions = '[Question] Get Popular Questions',

    OnGetRecentQuestions = '[Question] On Get Recent Questions',
    GetRecentQuestions = '[Question] Get Recent Questions',

    OnGetRelatedQuestions = '[Question] On Get Related Questions',
    GetRelatedQuestions = '[Question] Get Related Questions',

    OnGetUnansweredQuestions = '[Question] On Get Unanswered Questions',
    GetUnansweredQuestions = '[Question] Get Unanswered Questions',

    OnGetTags = '[Question] On Get Tags',
    GetTags = '[Question] Get Tags',

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

export class OnGetRecentQuestions implements Action {
    readonly type = ActionTypes.OnGetRecentQuestions;
}

export class GetRecentQuestions implements Action {
    readonly type = ActionTypes.GetRecentQuestions;
    constructor(public payload: { questions: Question[] }) { }
}

export class OnGetRelatedQuestions implements Action {
    readonly type = ActionTypes.OnGetRelatedQuestions;
    constructor(public payload: { tags: string[] }) { }
}

export class GetRelatedQuestions implements Action {
    readonly type = ActionTypes.GetRelatedQuestions;
    constructor(public payload: { questions: Question[] }) { }
}

export class OnGetUnansweredQuestions implements Action {
    readonly type = ActionTypes.OnGetUnansweredQuestions;
}

export class GetUnansweredQuestions implements Action {
    readonly type = ActionTypes.GetUnansweredQuestions;
    constructor(public payload: { questions: Question[] }) { }
}

export class OnGetTags implements Action {
    readonly type = ActionTypes.OnGetTags;
}

export class GetTags implements Action {
    readonly type = ActionTypes.GetTags;
    constructor(public payload: { tags: string[] }) { }
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
    constructor(public payload: { questionId: string, answerId: string, newAnswer: string }) { }
}

export class EditAnswer implements Action {
    readonly type = ActionTypes.EditAnswer;
    constructor(public payload: { questionId: string, answerId: string, newAnswer: string }) { }
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
    | OnGetRecentQuestions
    | OnGetRelatedQuestions
    | GetRelatedQuestions
    | GetRecentQuestions
    | OnGetUnansweredQuestions
    | GetUnansweredQuestions
    | OnGetTags
    | GetTags
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