import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import * as AuthActions from './auth.actions';
import { UserService } from '../user/user.service';

@Injectable()

export class AuthEffects {
    @Effect()
    authSignin$: Observable<Action> = this.action$.pipe(
        ofType(AuthActions.ActionTypes.OnSignin),
        switchMap((action: AuthActions.OnSignin) => {
            return this.userService.signin(action.payload.email, action.payload.password)
            .pipe(
                map((response: any)=>{
                    //grab user info from response
                    return new AuthActions.Signin(response);
                })
            )
        })
    )

    constructor(private action$: Actions, private userService: UserService){}
}