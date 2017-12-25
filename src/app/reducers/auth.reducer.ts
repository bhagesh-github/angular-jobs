import * as actions from '../actions/action.types';
import { All } from '../actions/auth.actions';
import { UserModel } from '../models/user.model';
import { Action } from '@ngrx/store';
export interface authState {
    loading:boolean | undefined,
    success:boolean | undefined,
    error:string,
    loadingMsg:string,
    showAlert:boolean | undefined
}

const initialState:authState = {
    loading:undefined,
    success:undefined,
    error:'',
    loadingMsg:'',
    showAlert:undefined
}

export function authReducer(state = initialState, action:All) {
    switch(action.type) {
        case actions.LOGIN_USER:
            return {
                ...state,
                loading:true
            }
        case actions.LOGIN_USER_SUCCESS:
            console.log(state);
            return {
                ...state,
                loading:false,
                success:true
            }
        case actions.LOGIN_USER_ERROR:
            return {
                ...state,
                loading:false,
                success:false,
                error:action.payload.message
            }
        case actions.SIGNUP_USER:
            return {
                ...state,
                loading:true
            }
        case actions.SIGNUP_USER_SUCCESS:
            return {
                ...state,
                loading:false,
                success:true
            }
        case actions.SIGNUP_USER_ERROR:
            return {
                ...state,
                loading:false,
                success:false
            }
        case actions.ALERT:
            console.log(action.payload);
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}