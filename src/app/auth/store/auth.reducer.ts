import { User } from "../user.model"
import * as AuthActions from "./auth.actions"

export interface State {
    user?: User
    authError? : string
    loading: boolean
}

const initialState : State = {
    user: undefined,
    authError : undefined,
    loading: false
}

export function authReducer(
    state = initialState, 
    action: AuthActions.AuthActions
    ) {
        switch(action.type){
            case AuthActions.AUTHENTICATE_SUCCES:
                const user = new User(
                    action.payload.email, 
                    action.payload.userID, 
                    action.payload.token, 
                    action.payload.expirationDate)
                return {
                    ...state,
                    authError: undefined,
                    user: user,
                    loading: false
                }
            case AuthActions.LOGOUT:
                return {
                    ...state,
                    authError: undefined,
                    user: undefined,
                }
            case AuthActions.LOGIN_START:
            case AuthActions.SIGNUP_START:
                return {
                    ...state,
                    authError: undefined,
                    loading: true
                }
            case AuthActions.AUTHENTICATE_FAIL:
                return {
                    ...state,
                    user: undefined,
                    authError: action.payload,
                    loading: false
                }
            case AuthActions.CLEAR_ERROR:
                return {
                    ...state,
                    authError : undefined
                }
            default:
                return state
        }
}