import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Subject, Subscription, throwError } from 'rxjs';
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

import { environment } from "../../environments/environment";
import { User } from "./user.model";
import * as fromApp from '../store/app.reducer'
import * as AuthActions from "./store/auth.actions";

export interface AuthResponseData {
    idToken: string,
    email: string,	
    refreshToken: string,
    expiresIn : string,   	
    localId: string,
    registered?: boolean
}

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private http: HttpClient, private router : Router, private store: Store<fromApp.AppState>){}
    //user!: BehaviorSubject<User>
    //user = new Subject<User>();
    //user = new BehaviorSubject<User | null>(null);
    private tokenExpirationTimer: any;

    signup(email: string, password: string){
        return this.http
        .post<AuthResponseData>
        ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+ environment.firebaseAPIKey,
        {email: email,
        password: password,
        returnSecureToken: true
    }
        ).pipe(catchError(
            this.handleError           
        ), tap(resData => {
            this.handleAuthentication(
                resData.email, 
                resData.localId, 
                resData.idToken, 
                +resData.expiresIn
                )
                
            })
        )
    }

    autoLogin(){
        const userDataJSON = localStorage.getItem('userData');        
        if(!userDataJSON){
            return;
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
                //this.user.next(loadedUser);
                this.store.dispatch(new AuthActions.Login({email: loadedUser.email, userID: loadedUser.id, token: loadedUser.token, expirationDate: new Date(userData._tokenExpirationDate)}))
                const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
                this.autoLogout(expirationDuration)
            }
    }

    autoLogout(expirationDuration: number){
        this.tokenExpirationTimer = setTimeout(()=>{
            this.logout();
        }, expirationDuration)
    }

    private handleAuthentication(
        email: string, 
        userId: string, 
        token: string, 
        expiresIn: number){
        const expirationDate = new Date(
            new Date().getTime() + expiresIn* 1000
            );
        const user = new User(
            email, 
            userId, 
            token, 
            expirationDate
            );
        //this.user.next(user)
        this.store.dispatch(
            new AuthActions.Login({
                email: email, 
                userID: userId, 
                token: token, 
                expirationDate: expirationDate}))
        this.autoLogout(expiresIn*1000);
        localStorage.setItem('userData', JSON.stringify(user));
        //console.log(user)
    }

    login(email: string, password: string){
        
        return this.http
        .post<AuthResponseData>
        ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
        {email: email,
        password: password,
        returnSecureToken: true
        })
        .pipe(catchError(
            this.handleError           
        ), tap(resData => {
            this.handleAuthentication(
                resData.email, 
                resData.localId, 
                resData.idToken, 
                +resData.expiresIn
                )
                
            }))
    }

    logout(){
        //this.user.next(null);
        this.store.dispatch(new AuthActions.Logout())
        this.router.navigate(['/auth'])
        localStorage.removeItem('userData')
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer)
        }
        this.tokenExpirationTimer = null;
    }

    private handleError(errorRes: HttpErrorResponse){
        let errorMessage = 'An unknown error occured'
                if(!errorRes.error || !errorRes.error.error){
                    return throwError(errorMessage);
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
                return throwError(errorMessage);
    }
}