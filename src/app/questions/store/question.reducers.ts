import * as QuestionActions from './question.actions';
import { Question } from '../question.model';

export interface QuestionState {
    questions: Question[],
    unansweredQuestions: Question[],
    tags: string[],
    questionsByTag: {
        tag: string,
        questions: Question[]
    },
    questionById: Question
}

export const initialState: QuestionState = {
    questions: null,
    unansweredQuestions: null,
    tags: null,
    questionsByTag: null,
    questionById: null
}

export function questionReducer(state: QuestionState, action: QuestionActions.Union): QuestionState {
    switch (action.type) {
        case QuestionActions.ActionTypes.GetPopularQuestions:
            return { ...state, questions: action.payload.questions };

        case QuestionActions.ActionTypes.FindQuestionById:
            return { ...state, questionById: action.payload.question };

        case QuestionActions.ActionTypes.FindQuestionsByTag:
            return {
                ...state,
                questionsByTag: { tag: action.payload.tag, questions: action.payload.questions }
            };

        case QuestionActions.ActionTypes.CreateQuestion:
            return {
                ...state,
                questions: [...state.questions, action.payload.question],
                unansweredQuestions: [...state.questions, action.payload.question]
            };

        case QuestionActions.ActionTypes.EditQuestion:
            return {
                ...state,
                //TO DO
                //update question (questionId) with newQuestion
            };

        case QuestionActions.ActionTypes.DeleteQuestion:
            return {
                ...state,
                //TO DO
                //delete question (questionId)
            };

        case QuestionActions.ActionTypes.VoteQuestion:
            return {
                ...state,
                //TO DO
                //update question (questionId) with newQuestion
            };

        case QuestionActions.ActionTypes.AddAnswer:
            return {
                ...state,
                //TO DO:
                //if add answer to unanswered question => remove question from unanswered question array
                //add answer to corresponding question in question array
            };

        case QuestionActions.ActionTypes.UpdateCorrectAnswer:
            return {
                ...state,
                //TO DO:
                //update answer with questionId & answerId
            };

        case QuestionActions.ActionTypes.EditAnswer:
            return {
                ...state,
                //TO DO:
                //update answer with answerId
            };

        case QuestionActions.ActionTypes.VoteAnswer:
            return {
                ...state,
                //TO DO:
                //vote answer with questionId & answerId & upvote
            };

        case QuestionActions.ActionTypes.DeleteAnswer:
            return {
                ...state,
                //TO DO:
                //delete answer with questionId & answerId
            };

        default:
            return state;
    }
}