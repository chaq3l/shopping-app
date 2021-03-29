import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  collapsed = true;
  @Output() headerTabClick = new EventEmitter<string>()
  
  constructor() { }

  ngOnInit(): void {
  }
  onSelect(headerFeature:string){
    this.headerTabClick.emit(headerFeature)
    //console.log("recipesClicked")
  }  
}
