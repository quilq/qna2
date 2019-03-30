import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import * as AuthActions from './auth.actions';
import { UserService } from '../user/user.service';

@Injectable()

export class AuthEffects {
    @Effect()
    authSignin$: Observable<Action> = this.action$
        .pipe(
            ofType(AuthActions.ActionTypes.OnSignin),
            switchMap((action: AuthActions.OnSignin) => {
                return this.userService.signin(action.payload.email, action.payload.password)
                    .pipe(
                        map((response: any) => {

                            console.log(response);

                            //for observe: 'response' => access .body to get info
                            let user = { username: response.body.username, email: response.body.email };
                            if (user) {
                                let token: string = response.headers.get('x-auth');
                                localStorage.setItem('token', token);
                                this.router.navigate(['/user']);
                                return new AuthActions.Signin({ ...user, token });
                            } else {
                                console.log('Sign in failed');
                            }
                        }),
                        //catchError()
                    )
            })
        )

    @Effect()
    authSignup$: Observable<Action> = this.action$
        .pipe(
            ofType(AuthActions.ActionTypes.OnSignup),
            switchMap((action: AuthActions.OnSignup) => {
                return this.userService.signup(action.payload.username, action.payload.email, action.payload.password)
                    .pipe(
                        map((response: any) => {

                            console.log(response);

                            let user = { username: response.body.username, email: response.body.email };
                            if (user) {
                                let token: string = response.headers.get('x-auth');
                                localStorage.setItem('token', token);
                                this.router.navigate(['/user']);
                                return new AuthActions.Signup({ ...user, token });
                            } else {
                                console.log('Sign up failed');
                            }
                        }),
                        //catchError()
                    )
            })
        )

    @Effect()
    authSignout$: Observable<Action> = this.action$
        .pipe(
            ofType(AuthActions.ActionTypes.OnSignout),
            switchMap(() => {
                return this.userService.signout()
                    .pipe(
                        map(() => {
                            localStorage.removeItem('token');
                            this.router.navigate(['/']);
                            return new AuthActions.Signout();
                        }),
                        //catchError()
                    )
            })
        )

    constructor(private action$: Actions, private userService: UserService, private router: Router) { }
}