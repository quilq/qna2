import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { AuthService } from '../auth.service';
import { Question } from '../../questions/question.model';
import * as AuthActions from './auth.actions';

@Injectable()

export class AuthEffects {
    @Effect()
    authSignin$: Observable<Action> = this.action$
        .pipe(
            ofType(AuthActions.ActionTypes.OnSignin),
            switchMap((action: AuthActions.OnSignin) => {
                return this.authService.signin(action.payload.email, action.payload.password)
                    .pipe(
                        map((response: any) => {
                            if (response.body._id) {
                                let token: string = response.headers.get('x-auth');
                                localStorage.setItem('token', token);
                                this.router.navigate(['/user']);
                                return new AuthActions.Signin({ ...response.body, token });
                            }
                        }),
                        catchError((error) => {
                            // console.log('Cannot signin. Error: ', error.error);
                            if ((error.error === 'wrong-email') || (error.error === 'wrong-password')) {
                                this.authService.errorAlert(error.error);
                            } else {
                                this.authService.errorAlert('Signin error.');
                            }
                            return EMPTY;
                        })
                    )
            })
        );

    @Effect()
    getUserQuestions$: Observable<Action> = this.action$
        .pipe(
            ofType(AuthActions.ActionTypes.OnGetUserQuestions),
            switchMap((action: AuthActions.OnGetUserQuestions) => {
                return this.authService.findQuestionsByUser(action.payload.userId)
                    .pipe(
                        map((questions: Question[]) => {
                            if (questions) {
                                return new AuthActions.GetUserQuestions({ userQuestions: questions });
                            }
                        }),
                        catchError((error) => {
                            // console.log('Cannot get user\'s questions. Error: ', error.error);
                            this.authService.errorAlert('Cannot get questions.');
                            return EMPTY;
                        })
                    )
            })
        );

    @Effect()
    getUserAnswers$: Observable<Action> = this.action$
        .pipe(
            ofType(AuthActions.ActionTypes.OnGetUserAnswers),
            switchMap((action: AuthActions.OnGetUserAnswers) => {
                return this.authService.findAnswersByUser(action.payload.userId)
                    .pipe(
                        map((questions: Question[]) => {
                            if (questions) {
                                return new AuthActions.GetUserAnswers({ userAnswers: questions });
                            }
                        }),
                        catchError((error) => {
                            // console.log('Cannot get user\'s answers. Error: ', error.error);
                            this.authService.errorAlert('Cannot get answers.');
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
                return this.authService.authenticateUser(action.payload.token)
                    .pipe(
                        map((response: any) => {
                            return new AuthActions.Signin({ ...response, token: action.payload.token })
                        }),
                        catchError((error) => {
                            // console.log('Cannot authenticate user. Error: ', error.error.message);
                            if (error.error.name === 'TokenExpiredError'){
                                this.authService.errorAlert('Session expired.');
                            }
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
            switchMap((action: AuthActions.OnSignup) => {
                return this.authService.signup(action.payload.username, action.payload.email, action.payload.password)
                    .pipe(
                        map((response: any) => {
                            if (response.body._id) {
                                let token: string = response.headers.get('x-auth');
                                localStorage.setItem('token', token);
                                this.router.navigate(['/user']);
                                return new AuthActions.Signup({ ...response.body, token });
                            }
                        }),
                        catchError((error) => {
                            // console.log('Signup error: ', error.error.errmsg);
                            if (error.error.code === 11000){
                                this.authService.errorAlert('This email has been registered.');
                            } else {
                                this.authService.errorAlert('Signup error. Please try again.');
                            }
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
                return this.authService.signout()
                    .pipe(
                        map(() => {
                            localStorage.removeItem('token');
                            this.router.navigate(['/']);
                            return new AuthActions.Signout();
                        }),
                        catchError((error) => {
                            // console.log('Signout error: ', error.error);
                            this.authService.errorAlert('Signout error.');
                            return EMPTY;
                        })
                    )
            })
        )

    constructor(private action$: Actions, private authService: AuthService, private router: Router) { }
}