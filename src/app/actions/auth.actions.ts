import { Action } from '@ngrx/store';
import * as actions from './action.types';
import { UserModel } from '../models/user.model';

export class LoginUser {
    readonly type =  actions.LOGIN_USER;
    constructor(public payload:UserModel) {}
}

export class LoginUserSuccess {
    readonly type = actions.LOGIN_USER_SUCCESS;
    constructor(public payload:any) {}
}

export class LoginUserError {
    readonly type = actions.LOGIN_USER_ERROR;
    constructor(public payload:any) {}
}

export class SignupUser {
    readonly type = actions.SIGNUP_USER;
    constructor(public payload:UserModel) {}
}

export class SignupUserSuccess {
    readonly type = actions.SIGNUP_USER_SUCCESS;
    constructor(public payload:any) {}
}

export class SignupUserError {
    readonly type = actions.SIGNUP_USER_ERROR;
    constructor(public payload:any) {}
}

export class Alert {
    readonly type = actions.ALERT;
    constructor(public payload:any) {}
}

export type All = LoginUser | LoginUserSuccess | LoginUserError | SignupUser | SignupUserSuccess | SignupUserError | Alert;