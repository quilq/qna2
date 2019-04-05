import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromAuth from './auth.reducers';

export const selectAuth = createFeatureSelector<fromAuth.AuthState>('auth');

export const isAuthenticated = createSelector(
    selectAuth,
    (authState: fromAuth.AuthState) => {
        return authState.isAuthenticated;
    }
);