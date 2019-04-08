import * as AuthActions from './auth.actions';
import { User } from '../user/user.model';

export interface AuthState {
    user: User;
    isAuthenticated: boolean;
    token: string
}

const initialState: AuthState = {
    user: new User(),
    isAuthenticated: false,
    token: ''
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

        case AuthActions.ActionTypes.Signout:
            return { ...initialState };

        default:
            return { ...state };
    }
}