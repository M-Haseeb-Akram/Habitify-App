import { User } from './../../models/user.model';
import { Action } from '@ngrx/store';


export enum AuthActionTypes {
  LOGIN = 'Login',
  LOGOUT = 'LogOut'
}


export class LogIn implements Action {
    readonly type = AuthActionTypes.LOGIN;
    constructor(public payload: User) {}
}

export class LogOut implements Action {
    readonly type = AuthActionTypes.LOGOUT;
    constructor(public payload: User) {}
}

export type All =
  | LogIn
  | LogOut;
