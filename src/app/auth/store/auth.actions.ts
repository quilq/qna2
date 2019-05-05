import { Action } from '@ngrx/store';
import { Question } from 'src/app/questions/question.model';

export enum ActionTypes {
    OnSignin = '[Auth] On sign in',
    Signin = '[Auth] Sign in',

    OnAuthenticateUser = '[Auth] On authenticate user',
    // AuthenticateUser = Signin

    OnSignup = '[Auth] On sign up',
    Signup = '[Auth] Sign up',

    OnGetUserQuestions = '[Auth] On get user questions',
    GetUserQuestions = '[Auth] Get user questions',

    OnGetUserAnswers = '[Auth] On get user answers',
    GetUserAnswers = '[Auth] Get user answers',

    OnSignout = '[Auth] On sign out',
    Signout = '[Auth] Sign out',
}

export class OnSignin implements Action {
    readonly type = ActionTypes.OnSignin;
    constructor(public payload: { email: string, password: string }) { }
}

export class Signin implements Action {
    readonly type = ActionTypes.Signin;
    constructor(public payload: { _id: string, username: string, email: string, token: string }) { }
}


export class OnGetUserQuestions implements Action {
    readonly type = ActionTypes.OnGetUserQuestions;
    constructor(public payload: { userId: string }) { }
}

export class GetUserQuestions implements Action {
    readonly type = ActionTypes.GetUserQuestions;
    constructor(public payload: { userQuestions: Question[] }) { }
}

export class OnGetUserAnswers implements Action {
    readonly type = ActionTypes.OnGetUserAnswers;
    constructor(public payload: { userId: string }) { }
}

export class GetUserAnswers implements Action {
    readonly type = ActionTypes.GetUserAnswers;
    constructor(public payload: { userAnswers: Question[] }) { }
}

export class OnAuthenticateUser implements Action {
    readonly type = ActionTypes.OnAuthenticateUser;
    constructor(public payload: { token: string }) { }
}

export class OnSignup implements Action {
    readonly type = ActionTypes.OnSignup;
    constructor(public payload: { username: string, email: string, password: string }) { }
}

export class Signup implements Action {
    readonly type = ActionTypes.Signup;
    constructor(public payload: { _id: string, username: string, email: string, token: string }) { }
}
export class OnSignout implements Action {
    readonly type = ActionTypes.OnSignout;
}

export class Signout implements Action {
    readonly type = ActionTypes.Signout;
}

export type Union =
    | OnSignin
    | Signin
    | OnGetUserQuestions
    | GetUserQuestions
    | OnGetUserAnswers
    | GetUserAnswers
    | OnSignup
    | Signup
    | OnSignout
    | Signout;
