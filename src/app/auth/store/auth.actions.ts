import { Action } from "@ngrx/store"


export const LOGIN_START = '[Auth] LOGIN_START'
export const AUTHENTICATE_FAIL = '[Auth] AUTHENTICATE_FAIL'
export const AUTHENTICATE_SUCCES = '[Auth] AUTHENTICATE_SUCCES'
export const SIGNUP_START = '[Auth] SIGNUP_START'
export const CLEAR_ERROR = '[Auth] CLEAR_ERROR'
export const LOGOUT = '[Auth] LOGOUT'
export const AUTO_LOGIN = '[Auth] AUTO_LOGIN'


export class AuthenticateSucces implements Action {
    readonly type = AUTHENTICATE_SUCCES

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

export class AuthenticateFail implements Action {
    readonly type = AUTHENTICATE_FAIL;

    constructor(public payload: string){}
}

export class SignupStart implements Action {
    readonly type = SIGNUP_START
    constructor(public payload: {email:string, password:string}){}
}

export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
    
}

export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN
    
}

export type AuthActions =
|AuthenticateSucces
|Logout
|LoginStart
|AuthenticateFail
|SignupStart
|ClearError
|AutoLogin