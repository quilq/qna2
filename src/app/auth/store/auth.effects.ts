import { Injectable } from '@angular/core';
import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';

import { AuthService } from '../auth.service';
import { Question } from '../../questions/question.model';
import * as AuthActions from './auth.actions';

@Injectable()

export class AuthEffects {
    @Effect()
    authSignin$ = createEffect(() => this.action$.pipe(
        ofType(AuthActions.onSignin),
        mergeMap((action) => {
            return this.authService.signin(action.email, action.password).pipe(
                map((response: any) => {
                    let token: string = response.headers.get('x-auth');
                    localStorage.setItem('token', token);
                    this.router.navigate(['/user']);
                    return AuthActions.signin({ ...response.body, token });
                }),
                catchError((error) => {
                    // console.log('Cannot signin. Error: ', error.error);
                    if ((error.error === 'wrong-email') || (error.error === 'wrong-password')) {
                        this.authService.errorAlert('Wrong email or password !');
                    } else {
                        this.authService.errorAlert('Signin error.');
                    }
                    return EMPTY;
                })
            )
        })
    ));

    @Effect()
    getUserQuestions$ = createEffect(() => this.action$.pipe(
        ofType(AuthActions.onGetUserQuestions),
        mergeMap((action) => {
            return this.authService.findQuestionsByUser(action.userId).pipe(
                map((questions: Question[]) => AuthActions.getUserQuestions({ userQuestions: questions })),
                catchError((error) => {
                    // console.log('Cannot get user\'s questions. Error: ', error.error);
                    this.authService.errorAlert('Cannot get questions.');
                    return EMPTY;
                })
            )
        })
    ));

    @Effect()
    getUserAnswers$ = createEffect(() => this.action$.pipe(
        ofType(AuthActions.onGetUserAnswers),
        mergeMap((action) => {
            return this.authService.findAnswersByUser(action.userId).pipe(
                map((questions: Question[]) => AuthActions.getUserAnswers({ userAnswers: questions })),
                catchError((error) => {
                    // console.log('Cannot get user\'s answers. Error: ', error.error);
                    this.authService.errorAlert('Cannot get answers.');
                    return EMPTY;
                })
            )
        })
    ));

    @Effect()
    authenticateUser = createEffect(() => this.action$.pipe(
        ofType(AuthActions.onAuthenticateUser),
        mergeMap((action) => {
            return this.authService.authenticateUser(action.token).pipe(
                map((response: any) => AuthActions.signin({ ...response, token: action.token })),
                catchError((error) => {
                    // console.log('Cannot authenticate user. Error: ', error.error.message);
                    if (error.error.name === 'TokenExpiredError') {
                        this.authService.errorAlert('Session expired.');
                    }
                    localStorage.removeItem('token');
                    return EMPTY;
                })
            )
        })
    ));

    @Effect()
    authSignup$ = createEffect(() => this.action$.pipe(
        ofType(AuthActions.onSignup),
        mergeMap((action) => {
            return this.authService.signup(action.username, action.email, action.password).pipe(
                map((response: any) => {
                    let token: string = response.headers.get('x-auth');
                    localStorage.setItem('token', token);
                    this.router.navigate(['/user']);
                    return AuthActions.signup({ ...response.body, token });
                }),
                catchError((error) => {
                    // console.log('Signup error: ', error.error.errmsg);
                    if (error.error.code === 11000) {
                        this.authService.errorAlert('This email has been registered.');
                    } else {
                        this.authService.errorAlert('Signup error. Please try again.');
                    }
                    return EMPTY;
                })
            )
        })
    ));

    @Effect()
    authSignout$ = createEffect(() => this.action$.pipe(
        ofType(AuthActions.onSignout),
        mergeMap(() => {
            return this.authService.signout().pipe(
                map(() => {
                    localStorage.removeItem('token');
                    this.router.navigate(['/']);
                    return AuthActions.signout();
                }),
                catchError((error) => {
                    // console.log('Signout error: ', error.error);
                    this.authService.errorAlert('Signout error.');
                    return EMPTY;
                })
            )
        })
    ));

    constructor(private action$: Actions, private authService: AuthService, private router: Router) { }
}