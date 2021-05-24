import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

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
    private router:Router, 
    private dataStorageService : DataStorageService, 
    private authService: AuthService)
     { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(
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
  ngOnDestroy(){
    this.userSub.unsubscribe()
  }
}
