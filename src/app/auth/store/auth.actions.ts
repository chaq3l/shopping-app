import { Action } from "@ngrx/store"


export const LOGIN_START = '[Auth] LOGIN_START'
export const LOGIN_FAIL = '[Auth] LOGIN_FAIL'
export const LOGIN = '[Auth] LOGIN'
export const LOGOUT = '[Auth] LOGOUT'


export class Login implements Action {
    readonly type = LOGIN

    constructor(
        public payload: { 
            email: string, 
            userID: string, 
            token: string, 
            expirationDate: Date }
    ) {}
}

export class Logout implements Action {
    readonly type = LOGOUT

    // constructor(
    //     public payload: {

    //     }
    // ) {}
}

export class LoginStart implements Action {
    readonly type = LOGIN_START

    constructor(public payload: {email: string; password: string}){}
}

export class LoginFail implements Action {
    readonly type = LOGIN_FAIL;

    constructor(public payload: string){}
}

export type AuthActions =
|Login
|Logout
|LoginStart
|LoginFail