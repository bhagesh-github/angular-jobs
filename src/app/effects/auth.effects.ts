import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { UserModel } from '../models/user.model';
import * as actions from '../actions/action.types';
import { LoginUser, LoginUserSuccess, LoginUserError } from '../actions/auth.actions';
import { AuthService } from '../pages/login/auth.services';

@Injectable()

export class AuthEffects {
    @Effect()
    loginUser:Observable<Action> = this.actions$
    .ofType(actions.LOGIN_USER)
    .map(toPayload)
    .switchMap((loginData) => {
        return this.authService.login(loginData)
               .map((data) => {
                   return new LoginUserSuccess(data)
               })
               .catch((error) => of(new LoginUserError(error)))
    });

    constructor(private actions$: Actions, private authService:AuthService) {}
}