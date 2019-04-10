import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromQuestion from './question.reducers';

export const selectQuestionFeature = createFeatureSelector<fromQuestion.QuestionState>('question');

export const hasLoaded = createSelector(
    selectQuestionFeature,
    (questionState: fromQuestion.QuestionState) => {
        return questionState.hasLoaded;
    }
);

export const getQuestions = createSelector(
    selectQuestionFeature,
    (questionState: fromQuestion.QuestionState) => {
        return questionState.questions;
    }
);

export const getQuestionById = createSelector(
    selectQuestionFeature,
    (questionState: fromQuestion.QuestionState) => {
        return questionState.questionById;
    }
);

export const getQuestionsByTag = createSelector(
    selectQuestionFeature,
    (questionState: fromQuestion.QuestionState) => {
        return questionState.questionsByTag;
    }
);

export const getTags = createSelector(
    selectQuestionFeature,
    (questionState: fromQuestion.QuestionState) => {
        return questionState.tags; 
    }
);

export const getUnansweredQuestions = createSelector(
    selectQuestionFeature,
    (questionState: fromQuestion.QuestionState) => {
        return questionState.unansweredQuestions;
    }
);

