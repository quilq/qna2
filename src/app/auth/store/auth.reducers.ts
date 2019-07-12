import { createReducer, on, Action } from '@ngrx/store';

import { User } from '../user/user.model';
import { Question } from '../../questions/question.model';
import * as AuthActions from './auth.actions';

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

const reducer = createReducer(
    initialState,
    on(AuthActions.signup, AuthActions.signin, (state, action) => ({
        ...state,
        user: new User(action._id, action.username, action.email),
        isAuthenticated: true,
        token: action.token
    })),
    on(AuthActions.getUserQuestions, (state, action) => ({
        ...state,
        userQuestions: action.userQuestions
    })),
    on(AuthActions.getUserAnswers, (state, action) => ({
        ...state,
        userAnswers: action.userAnswers
    })),
    on(AuthActions.signout, () => ({ ...initialState }))
)

// export function authReducer(state: AuthState = initialState, action: AuthActions.Union): AuthState {
//     switch (action.type) {
//         case AuthActions.ActionTypes.Signup:
//         case AuthActions.ActionTypes.Signin:
//             let newUser = new User(action.payload._id, action.payload.username, action.payload.email);
//             return {
//                 ...state,
//                 user: newUser,
//                 isAuthenticated: true,
//                 token: action.payload.token
//             };

//         case AuthActions.ActionTypes.GetUserQuestions:
//             return { ...state, userQuestions: action.payload.userQuestions };

//         case AuthActions.ActionTypes.GetUserAnswers:
//             return { ...state, userAnswers: action.payload.userAnswers };

//         case AuthActions.ActionTypes.Signout:
//             return { ...initialState };

//         default:
//             return { ...state };
//     }
// }

export function authReducer(authState: AuthState | undefined, action: Action) {
    return reducer(authState, action);
}