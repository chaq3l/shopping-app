import { Component, ComponentFactoryResolver, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
//import { Router } from "@angular/router";
import { Subscription } from "rxjs";
//import { AuthService, AuthResponseData } from "./auth.service";
import { Store } from "@ngrx/store";

import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import * as fromApp from '../store/app.reducer'
import * as AuthAction from '../auth/store/auth.actions'

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy{
    isLoginMode = true;
    isLoading = false;
    error?: string = ''
    private closeSub = new Subscription
    private storeSub = new Subscription
    @ViewChild(PlaceholderDirective, {static: false}) alertHost!: PlaceholderDirective;

    constructor(
        //private authService: AuthService, 
        //private router : Router, 
        private componentFactoryResolver: ComponentFactoryResolver,
        private store: Store<fromApp.AppState>){}

    ngOnInit(){
        this.storeSub = this.store.select('auth').subscribe(authState => {
            this.isLoading = authState.loading;
            this.error = authState.authError
            if(this.error){
                this.showErrorAlert(this.error)
            }
        })
    }


    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm){
        //console.log(form.value)
        if (!form.valid){
            return
        }
        const email = form.value.email;
        const password = form.value.password       

        
        if (this.isLoginMode){
            //authObs = this.authService.login(email, password)
            this.store.dispatch(new AuthAction.LoginStart({email:email, password:password}))
        }
        else {        
            this.store.dispatch(new AuthAction.SignupStart({email:email, password:password}))
        }

        
        // authObs.subscribe( resData =>{
        //     console.log(resData)
        //     this.isLoading = false;
        //     this.error = ''
        //     this.router.navigate(['/recipe'])
        // }, errorMessage => {
        //     console.log(errorMessage)            
        //     this.error = errorMessage;
        //     this.showErrorAlert(errorMessage)
        //     this.isLoading = false;
        // }
        // );
        form.reset()
    }

    onHandleError(){
        this.store.dispatch(new AuthAction.ClearError())
    }

    private showErrorAlert(message: string){
        //const alertComp = new AlertComponent();
        const alertCompFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();

        const componentRef = hostViewContainerRef.createComponent(alertCompFactory);
        componentRef.instance.message = message;
        this.closeSub = componentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe()
            this.error = ''
            hostViewContainerRef.clear()
        })
    }

    ngOnDestroy(){
        if(this.closeSub){
            this.closeSub.unsubscribe()
        }
        if(this.storeSub){
            this.storeSub.unsubscribe()
        }
    }
}