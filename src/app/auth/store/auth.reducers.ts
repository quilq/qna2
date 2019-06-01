import * as AuthActions from './auth.actions';
import { User } from '../user/user.model';
import { Question } from '../../questions/question.model';

export interface AuthState {
    user: User;
    isAuthenticated: boolean;
    token: string,
    userQuestions: Question[],
    userAnswers: Question[]
}

export const initialState: AuthState = {
    user: new User(),
    isAuthenticated: false,
    token: '',
    userQuestions: [],
    userAnswers: []
}

export function authReducer(state: AuthState = initialState, action: AuthActions.Union): AuthState {
    switch (action.type) {
        case AuthActions.ActionTypes.Signup:
        case AuthActions.ActionTypes.Signin:
            let newUser = new User(action.payload._id, action.payload.username, action.payload.email);
            return {
                ...state,
                user: newUser,
                isAuthenticated: true,
                token: action.payload.token
            };

        case AuthActions.ActionTypes.GetUserQuestions:
            return { ...state, userQuestions: action.payload.userQuestions };

        case AuthActions.ActionTypes.GetUserAnswers:
            return { ...state, userAnswers: action.payload.userAnswers };

        case AuthActions.ActionTypes.Signout:
            return { ...initialState };

        default:
            return { ...state };
    }
}