import { Action } from "@ngrx/store"

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'


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

export type AuthActions =
|Login
|Logout