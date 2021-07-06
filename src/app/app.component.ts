import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './auth/auth.service';

import * as fromApp from './store/app.reducer'
import * as AuthAction from './auth/store/auth.actions'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'shopping-app';
  chosenTab='recipesClicked'

  constructor(private authService: AuthService, private store:Store<fromApp.AppState>){}

  onAfterViewInit(){
    this.headerTabClick()
  }

  ngOnInit(){
    this.store.dispatch(new AuthAction.AutoLogin())
  }

  headerTabClick(chosenTab:string="recipesClicked"){
    this.chosenTab = chosenTab
  //   switch(chosenTab) { 
  //     case "recipesClicked": { 
  //        //statements; 
  //        break; 
  //     } 
  //     case "shoppingListClick": { 
  //        //statements; 
  //        break; 
  //     } 
  //     default: { 
  //        //statements; 
  //        break; 
  //     } 
  //  } 

  }
}
