import { authState, authReducer } from './auth.reducer';

export interface State {
    auth:authState
}

export const REDUCERS = {
    auth:authReducer
}