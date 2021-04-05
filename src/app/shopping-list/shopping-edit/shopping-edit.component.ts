import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @Output() emitRecipe = new EventEmitter<{item: string, ammount: number}>();
  @ViewChild('itemName', {static: false}) itemNameRef!: ElementRef;
  @ViewChild('itemAmmount', {static: false}) itemAmmountRef!: ElementRef;
  
  constructor() { }

  ngOnInit(): void {
  }
  addItem() {
    const itemNameString = this.itemNameRef.nativeElement.value
    const itemAmmountNumber = this.itemAmmountRef.nativeElement.value
    if(itemAmmountNumber>0 && itemNameString!=''){
      this.emitRecipe.emit({item: itemNameString, ammount: itemAmmountNumber})      
    } 
    
  }
}
