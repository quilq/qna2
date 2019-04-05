import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromQuestion from './question.reducers';

export const selectQuestion = createFeatureSelector<fromQuestion.QuestionState>('question');

export const getQuestions = createSelector(
    selectQuestion,
    (questionState: fromQuestion.QuestionState) => {
        return questionState.questions;
    }
);