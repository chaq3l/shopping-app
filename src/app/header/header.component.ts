import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  collapsed = true;
  
  constructor(private router:Router, private dataStorageService : DataStorageService) { }

  ngOnInit(): void {
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
}
