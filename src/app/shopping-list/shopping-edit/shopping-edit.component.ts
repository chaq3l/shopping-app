import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service'
import { Ingredient } from '../../shared/ingredient.model';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @Output() emitRecipe = new EventEmitter<{item: string, ammount: number}>();
  @ViewChild('itemName', {static: false}) itemNameRef!: ElementRef;
  @ViewChild('itemAmmount', {static: false}) itemAmmountRef!: ElementRef;
  
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {
  }
  addItem() {
    const itemNameString = this.itemNameRef.nativeElement.value
    const itemAmmountNumber = this.itemAmmountRef.nativeElement.value
    if(itemAmmountNumber>0 && itemNameString!=''){
      this.shoppingListService.addIngredient(new Ingredient(itemNameString, itemAmmountNumber))      
    } 
    
  }
}
