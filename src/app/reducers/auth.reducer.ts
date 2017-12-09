import * as actions from '../actions/action.types';
import { All } from '../actions/auth.actions';
import { UserModel } from '../models/user.model';
import { Action } from '@ngrx/store';
export interface authState {
    loging:boolean,
    success:boolean
}

const initialState:authState = {
    loging:false,
    success:false
}

export function authReducer(state = initialState, action:All) {
    switch(action.type) {
        case actions.LOGIN_USER:
            return {
                ...state,
                loging:true
            }
        case actions.LOGIN_USER_SUCCESS:
            return {
                ...state,
                loging:false,
                success:true
            }
        case actions.LOGIN_USER_ERROR:
            return {
                ...state,
                loging:false,
                success:false
            }
        default:
            return state
    }
}