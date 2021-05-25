import { Component, AfterViewInit, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'shopping-app';
  chosenTab='recipesClicked'

  constructor(private authService: AuthService){}

  onAfterViewInit(){
    this.headerTabClick()
  }

  ngOnInit(){
    this.authService.autoLogin()
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
