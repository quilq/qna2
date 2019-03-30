import { AuthState } from './auth.reducers';

export const selectUser = (state: AuthState) => state.user;
export const isAuthenticated = (state: AuthState) => state.isAuthenticated;
