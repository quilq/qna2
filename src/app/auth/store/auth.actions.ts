import { Action } from '@ngrx/store';

import { User } from '../user/user.model';

export enum ActionTypes {
    OnSignin = '[Auth] On Sign in',
    Signin = '[Auth] Sign in',

    OnSignup = '[Auth] On sign up',
    Signup = '[Auth] Sign up',
    
    OnSignout = '[Auth] On sign out',
    Signout = '[Auth] Sign out',
}

export class OnSignin implements Action {
    readonly type = ActionTypes.OnSignin;
    constructor(public payload: { email: string, password: string }) { }
}

export class Signin implements Action {
    readonly type = ActionTypes.Signin;
    constructor(public payload: { username: string, email: string, token: string }) { }
}

export class OnSignup implements Action {
    readonly type = ActionTypes.OnSignup;
    constructor(public payload: {username: string, email: string, password: string }) { }
}

export class Signup implements Action {
    readonly type = ActionTypes.Signup;
    constructor(public payload: { username: string, email: string, token: string }) { }
}
export class OnSignout implements Action {
    readonly type = ActionTypes.OnSignout;
}

export class Signout implements Action {
    readonly type = ActionTypes.Signout;
}

export type Union = OnSignin | Signin | OnSignup | Signup | OnSignout | Signout;
