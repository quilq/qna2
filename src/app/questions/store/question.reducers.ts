import * as QuestionActions from './question.actions';
import { Question } from '../question.model';

export interface QuestionState {
    questions: Question[]
}

export const initialState: QuestionState = {
    questions: []
}

export function questionReducer(state: QuestionState, action: QuestionActions.Union): QuestionState {
    switch (action.type) {
        case QuestionActions.ActionTypes.GetPopularQuestions:
            return {...state, questions: action.payload};

        default:
            return state;
    }
}