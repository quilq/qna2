import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromQuestion from './question.reducers';

export const selectQuestionFeature = createFeatureSelector<fromQuestion.QuestionState>('question');

export const hasLoaded = createSelector(
    selectQuestionFeature,
    (questionState: fromQuestion.QuestionState) => {
        return questionState.hasLoaded;
    }
);

export const getPopularQuestions = createSelector(
    selectQuestionFeature,
    (questionState: fromQuestion.QuestionState) => {
        return questionState.popularQuestions;
    }
);

export const getRecentQuestions = createSelector(
    selectQuestionFeature,
    (questionState: fromQuestion.QuestionState) => {
        return questionState.recentQuestions;
    }
);

export const getRelatedQuestions = createSelector(
    selectQuestionFeature,
    (questionState: fromQuestion.QuestionState) => {
        return questionState.relatedQuestions;
    }
);

export const getFeaturedQuestions = createSelector(
    selectQuestionFeature,
    (questionState: fromQuestion.QuestionState) => {
        return questionState.featuredQuestions;
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
        return questionState.questionsByTag.questions;
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

