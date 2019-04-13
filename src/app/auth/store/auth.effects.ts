import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';

import { UserService } from '../user/user.service';
import * as AuthActions from './auth.actions';

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
                            // let user = {_id: response.body._id, username: response.body.username, email: response.body.email };
                            if (response.body._id) {
                                let token: string = response.headers.get('x-auth');
                                localStorage.setItem('token', token);
                                this.router.navigate(['/user']);
                                return new AuthActions.Signin({ ...response.body, token });
                            }
                        }),
                        catchError((error) => {
                            console.log('Error: ', error);
                            return EMPTY;
                        })
                    )
            })
        );

    @Effect()
    authenticateUser: Observable<Action> = this.action$
        .pipe(
            ofType(AuthActions.ActionTypes.OnAuthenticateUser),
            switchMap((action: AuthActions.OnAuthenticateUser) => {
                return this.userService.authenticateUser(action.payload.token)
                    .pipe(
                        map((response: any) => {
                            return new AuthActions.Signin({ ...response, token: action.payload.token })
                        }),
                        catchError((error) => {
                            console.log('Error: ', error.error.message);
                            localStorage.removeItem('token');
                            return EMPTY;
                        })
                    )
            })
        )

    @Effect()
    authSignup$: Observable<Action> = this.action$
        .pipe(
            ofType(AuthActions.ActionTypes.OnSignup),
            tap(() => console.log('on sign up effect called!')),
            switchMap((action: AuthActions.OnSignup) => {
                return this.userService.signup(action.payload.username, action.payload.email, action.payload.password)
                    .pipe(
                        map((response: any) => {

                            console.log(response);

                            // let user = {_id: response.body._id, username: response.body.username, email: response.body.email };
                            if (response.body._id) {
                                let token: string = response.headers.get('x-auth');
                                localStorage.setItem('token', token);
                                this.router.navigate(['/user']);
                                return new AuthActions.Signup({ ...response.body, token });
                            }
                        }),
                        catchError((error) => {
                            console.log('Error: ', error);
                            return EMPTY;
                        })
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
                        catchError((error) => {
                            console.log('Error: ', error);
                            return EMPTY;
                        })
                    )
            })
        )

    constructor(private action$: Actions, private userService: UserService, private router: Router) { }
}