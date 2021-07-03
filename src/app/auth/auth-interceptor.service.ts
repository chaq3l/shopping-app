import { Injectable } from "@angular/core";
import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http'
import { AuthService } from "./auth.service";
import { take, exhaustMap, map } from 'rxjs/operators';
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import * as fromApp from '../store/app.reducer'

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

    //authUserSub ?: Subscription
constructor(private authService : AuthService, private store : Store<fromApp.AppState>){
    // this.authUserSub = store.select('auth').subscribe((user)=>{
    //     return user
    // })
}

    intercept(req: HttpRequest<any>, next: HttpHandler){
        
        return this.store.select('auth').pipe(take(1), 
        map(authState => {
            return authState.user;
        }),
        exhaustMap(user =>{
            if(!user || !user.token){                
                return next.handle(req);
            }
                const modifiedReq = req.clone({params : new HttpParams().set('auth', user.token)})
                return next.handle(modifiedReq)
        
    
    }))
        
    }
}