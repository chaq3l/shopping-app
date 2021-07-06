import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects'
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as AuthActions from './auth.actions'
import { User } from '../user.model';
import { AuthService } from '../auth.service';


export interface AuthResponseData {
    idToken: string,
    email: string,	
    refreshToken: string,
    expiresIn : string,   	
    localId: string,
    registered?: boolean
};

const handleError = (errorRes: any) => {
    let errorMessage = 'An unknown error occured';
        if(!errorRes.error || !errorRes.error.error){
            return of(new AuthActions.AuthenticateFail(errorMessage))
        }
        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already'
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email do not exist'
                break;

            case 'INVALID_PASSWORD':
                errorMessage = 'Incorrect password'
                break;
        }
            return of(new AuthActions.AuthenticateFail(errorMessage))
                
}

const handleAuthentication = (expiresIn: number, email: string, userId: string, token: string) => {
    
    const expirationDate = new Date(new Date().getTime() + +expiresIn* 1000);
    const user = new User(
        email, 
        userId, 
        token, 
        expirationDate
        );
    
    localStorage.setItem('userData', JSON.stringify(user));

    return new AuthActions.AuthenticateSucces({
        email: email,
        userID: userId, 
        token: token, 
        expirationDate:expirationDate})
}

@Injectable()
export class AuthEffects {
    @Effect()
    authSignup = this.actions$.pipe(
            ofType(AuthActions.SIGNUP_START),
            switchMap((signupAtion: AuthActions.SignupStart) => {
                    return this.http
                .post<AuthResponseData>
                ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+ environment.firebaseAPIKey,
                {email: signupAtion.payload.email,
                password: signupAtion.payload.password,
                returnSecureToken: true
                }
                    ).pipe(
                        tap(
                            resData => {
                                this.authService.setLogoutTimer(+resData.expiresIn * 1000)
                            }
                        ),
                        map(resData => {
                            return handleAuthentication(
                                +resData.expiresIn,
                                resData.email,
                                resData.localId,
                                resData.idToken
                                );
                        }),
                        catchError(errorRes => {
                            return handleError(errorRes)                
                        
                        })
                    )
            })
    )
    
    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http
            .post<AuthResponseData>
            ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
            {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true
            })
                .pipe(
                    tap(
                        resData => {
                            this.authService.setLogoutTimer(+resData.expiresIn * 1000)
                        }
                    ),
                    map(resData => {
                        return handleAuthentication(
                            +resData.expiresIn,
                            resData.email,
                            resData.localId,
                            resData.idToken
                        );
                    }),
                    catchError(errorRes => {
                        return handleError(errorRes)
                    })
                );
        }),
        
    );
    @Effect({dispatch: false})
    authRedirect = this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCES), 
        tap(() => {
            this.router.navigate(['/']);
    }))

    @Effect({dispatch: false})
    authLogout = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(()=>{
            this.authService.clearLogoutTime();
            localStorage.removeItem('userData')
            this.router.navigate(['/auth'])
        })
    )

    @Effect()
    authAutologin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(()=>{
            const userDataJSON = localStorage.getItem('userData');        
        if(!userDataJSON){
            return {type: 'DUMMY'};
        }
        const userData:
        {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(userDataJSON);

        const loadedUser = new User(
            userData.email,
             userData.id,
             userData._token,
             new Date(userData._tokenExpirationDate));

            if(loadedUser.token){
                const expirationDuration = 
                new Date(userData._tokenExpirationDate).getTime() - 
                new Date().getTime()

                this.authService.setLogoutTimer(expirationDuration)
                //this.user.next(loadedUser);
                return  new AuthActions.AuthenticateSucces({
                        email: loadedUser.email, 
                        userID: loadedUser.id, 
                        token: String(loadedUser.token), 
                        expirationDate: new Date(userData._tokenExpirationDate)})
                
            }
            return {type: 'DUMMY'}
        })
    )

    constructor(
        private actions$: Actions, 
        private http : HttpClient, 
        private router: Router,
        private authService: AuthService) {}
}