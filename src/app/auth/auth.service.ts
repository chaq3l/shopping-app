import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Subject, Subscription, throwError } from 'rxjs';
import { User } from "./user.model";
import { Router } from "@angular/router";


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
    constructor(private http: HttpClient, private router : Router){}
    //user!: BehaviorSubject<User>
    user = new BehaviorSubject<User | null>(null);
    //user = new Subject<User>();

    signup(email: string, password: string){
        return this.http
        .post<AuthResponseData>
        ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyARD_ZqihRmInSKbSt0cDU0P5nsWcO24uo',
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
        this.user.next(user)
        //console.log(user)
    }

    login(email: string, password: string){
        
        return this.http
        .post<AuthResponseData>
        ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyARD_ZqihRmInSKbSt0cDU0P5nsWcO24uo',
        {email: email,
        password: password,
        returnSecureToken: true
        }).pipe(catchError(
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
        this.user.next(null);
        this.router.navigate(['/auth'])
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