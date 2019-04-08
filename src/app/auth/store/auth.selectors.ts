import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromAuth from './auth.reducers';

export const selectAuthFeature = createFeatureSelector<fromAuth.AuthState>('auth');

export const isAuthenticated = createSelector(
    selectAuthFeature,
    (authState: fromAuth.AuthState) => {
        return authState.isAuthenticated;
    }
);

export const selectUser = createSelector(
    selectAuthFeature,
    (authState: fromAuth.AuthState) => {
        return authState.user;
    }
);