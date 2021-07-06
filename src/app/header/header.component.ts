import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
//import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
//import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

import * as fromApp from '../store/app.reducer'
import * as AuthAction from '../auth/store/auth.actions'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  private userSub!: Subscription
  isAuthenticated = false;
  
  constructor(
    //private router:Router, 
    private dataStorageService : DataStorageService, 
    //private authService: AuthService,
    private store: Store<fromApp.AppState>)
     { }

  ngOnInit(): void {
    this.userSub = this.store.select('auth')
    .pipe(map(authState =>{ return authState.user }))
    .subscribe(
      user=>{
        this.isAuthenticated = !!user;
      }
    )
  }
  onSelect(headerFeature:string){
    //this.headerTabClick.emit(headerFeature)
    //console.log("recipesClicked")
  } 
  onSaveData(){
    this.dataStorageService.storeRecipes()
  }
  
  onLoadData(){
    this.dataStorageService.fetchRecipes().subscribe()
  }
  onLogout(){    
    this.store.dispatch(new AuthAction.Logout() )
  }
  ngOnDestroy(){
    this.userSub.unsubscribe()
  }
}
