import { Action } from '@ngrx/store';

export enum ActionTypes {
    OnSignin = '[Auth] On sign in',
    Signin = '[Auth] Sign in',

    OnAuthenticateUser = '[Auth] On authenticate user',
    // AuthenticateUser = '[Auth] Authenticate user',

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
    constructor(public payload: {_id: string, username: string, email: string, token: string }) { }
}

export class OnAuthenticateUser implements Action {
    readonly type = ActionTypes.OnAuthenticateUser;
    constructor(public payload: { token: string }) { }
}

// export class AuthenticateUser implements Action {
//     readonly type = ActionTypes.AuthenticateUser;
//     constructor(public payload: {_id: string, username: string, email: string, token: string }) { }
// }

export class OnSignup implements Action {
    readonly type = ActionTypes.OnSignup;
    constructor(public payload: {username: string, email: string, password: string }) { }
}

export class Signup implements Action {
    readonly type = ActionTypes.Signup;
    constructor(public payload: {_id: string, username: string, email: string, token: string }) { }
}
export class OnSignout implements Action {
    readonly type = ActionTypes.OnSignout;
}

export class Signout implements Action {
    readonly type = ActionTypes.Signout;
}

export type Union = OnSignin | Signin | OnSignup | Signup | OnSignout | Signout;
