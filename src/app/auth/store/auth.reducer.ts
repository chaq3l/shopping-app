import { User } from "../user.model"
import * as AuthActions from "./auth.actions"

export interface State {
    user?: User
}

const initialState : State = {
    user: undefined
}

export function authReducer(
    state = initialState, 
    action: AuthActions.AuthActions
    ) {
        switch(action.type){
            case AuthActions.LOGIN:
                const user = new User(
                    action.payload.email, 
                    action.payload.userID, 
                    action.payload.token, 
                    action.payload.expirationDate)
                return {
                    ...state,
                    user: user
                }
            case AuthActions.LOGOUT:
                return {
                    ...state,
                    user: undefined
                }
            default:
                return state
        }
}