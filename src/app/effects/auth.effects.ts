import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserModel } from '../models/user.model';
import * as actions from '../actions/action.types';
import { LoginUser, LoginUserSuccess, LoginUserError, SignupUserSuccess, SignupUserError, Alert } from '../actions/auth.actions';
import { AuthService } from '../pages/auth/auth.services';
import 'rxjs/Rx';

@Injectable()

export class AuthEffects {
    @Effect()
    loginUser:Observable<Action> = this.actions$
    .ofType(actions.LOGIN_USER)
    .map(toPayload)
    .delay(1000)
    .switchMap(payload => {
        return this.authService.login(payload)
            .map(data => new LoginUserSuccess(data))
            .catch(err => of(new LoginUserError(err)))
    })

    @Effect()
    loginUserFailed:Observable<Action> = this.actions$
    .ofType(actions.LOGIN_USER_ERROR)
    .map(toPayload)
    .map(payload => new Alert({loadingMsg: payload.message}))

    @Effect()
    loginUserSuccess:Observable<Action> = this.actions$
    .ofType(actions.LOGIN_USER_SUCCESS)
    .map(payload => new Alert({loadingMsg: 'Authentication successful redirecting...'}))

    @Effect()
    signupUser:Observable<Action> = this.actions$
    .ofType(actions.SIGNUP_USER)
    .map(toPayload)
    .delay(5000)
    .switchMap(payload => {
        return this.authService.signup(payload)
            .map(data => {
                return new SignupUserSuccess(data)
            })
            .catch((err) => of(new SignupUserError(err)))
    })
    
    constructor(private actions$: Actions, private authService:AuthService, private af: AngularFireAuth) {}
}
