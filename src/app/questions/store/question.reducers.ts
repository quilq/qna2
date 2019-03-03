import * as QuestionActions from './question.actions';
import { Question } from '../question.model';

export interface QuestionState {
    questions: Question[]
}

export const initialState: QuestionState = {
    questions: []
}

export function QuestionReducer(state: QuestionState, action: QuestionActions.Union): QuestionState {
    switch (action.type) {
        case QuestionActions.ActionTypes.GetPopularQuestions:
            return state;

        default:
            return state;
    }
}