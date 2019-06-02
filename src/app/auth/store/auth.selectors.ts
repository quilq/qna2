import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromAuth from './auth.reducers';

export const selectAuthFeature = createFeatureSelector<fromAuth.AuthState>('auth');

export const isAuthenticated = createSelector(
    selectAuthFeature,
    (authState: fromAuth.AuthState) => {
        return authState.isAuthenticated;
    }
);

export const getToken = createSelector(
    selectAuthFeature,
    (authState: fromAuth.AuthState) => {
        return authState.token;
    }
)

export const selectUser = createSelector(
    selectAuthFeature,
    (authState: fromAuth.AuthState) => {
        return authState.user;
    }
);

export const getUserQuestions = createSelector(
    selectAuthFeature,
    (authState: fromAuth.AuthState) => {
        return authState.userQuestions;
    }
);

export const getUserAnswers = createSelector(
    selectAuthFeature,
    (authState: fromAuth.AuthState) => {
        return authState.userAnswers;
    }
);