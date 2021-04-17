import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  collapsed = true;
  
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  onSelect(headerFeature:string){
    //this.headerTabClick.emit(headerFeature)
    //console.log("recipesClicked")
  }  
}
