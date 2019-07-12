import { createAction, props } from '@ngrx/store';

import { Question } from '../../questions/question.model';

export const onSignin = createAction(
    '[Auth] On Sign In',
    props<{ email: string, password: string }>()
);

export const signin = createAction(
    '[Auth] Sign In',
    props<{ _id: string, username: string, email: string, token: string }>()
);

export const onGetUserQuestions = createAction(
    '[Auth] On Get User Questions',
    props<{ userId: string }>()
);

export const getUserQuestions = createAction(
    '[Auth] Get User Questions',
    props<{ userQuestions: Question[] }>()
);

export const onGetUserAnswers = createAction(
    '[Auth] On Get User Answers',
    props<{ userId: string }>()
);

export const getUserAnswers = createAction(
    '[Auth] Get User Answers',
    props<{ userAnswers: Question[] }>()
);

export const onAuthenticateUser = createAction(
    '[Auth] On Authenticate User',
    props<{ token: string }>()
);

export const onSignup = createAction(
    '[Auth] On Sign Up',
    props<{ username: string, email: string, password: string }>()
);

export const signup = createAction(
    '[Auth] Sign Up',
    props<{ _id: string, username: string, email: string, token: string }>()
);

export const onSignout = createAction(
    '[Auth] On Sign Out'
);

export const signout = createAction(
    '[Auth] Sign Out'
);