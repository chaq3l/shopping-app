import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { ShoppingListService } from '../shopping-list.service'
import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions'
import * as fromShoppingList from '../store/shopping-list.reducer'
//import { formatCurrency } from '@angular/common';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @Output() emitRecipe = new EventEmitter<{item: string, ammount: number}>();
  // @ViewChild('itemName', {static: false}) itemNameRef!: ElementRef;
  // @ViewChild('itemAmmount', {static: false}) itemAmmountRef!: ElementRef;
  
  @ViewChild('shoppingForm') shoppingForm!: NgForm;
  
  constructor(
    private shoppingListService:ShoppingListService,
    private store: Store<fromShoppingList.AppState>
  ) { }

  subscription!: Subscription;
  editMode = false;
  editedItemIndex!: number;
  editedItem!: Ingredient;
  ngOnInit(): void {    
    this.subscription = this.store.select('shoppingList').subscribe(stateData =>
      {
        if((stateData.editedIngredientIndex> -1)&&(stateData.editedIngredient)){
          this.editedItemIndex= stateData.editedIngredientIndex;
          this.editMode = true;
          this.editedItem = stateData.editedIngredient
          this.shoppingForm.setValue({
            name: this.editedItem.name,
            ammount: this.editedItem.ammount,    
            
          })
        }else{
          this.editMode = false;
        }        
      })

    // this.subscription = this.shoppingListService.startedEditing
    // .subscribe(
    //   (index:number) => {
    //     this.editedItemIndex= index;
    //     this.editMode = true;   
    //     this.editedItem = this.shoppingListService.getIngredient(index)
    //     this.shoppingForm.setValue({
    //       name: this.editedItem.name,
    //       ammount: this.editedItem.ammount
    //     })
    //   }
    // )
  }
  onSubmit(shoppingForm:NgForm) {
    // const itemNameString = this.itemNameRef.nativeElement.value
    // const itemAmmountNumber = this.itemAmmountRef.nativeElement.value
    // if(itemAmmountNumber>0 && itemNameString!=''){
    //   this.shoppingListService.addIngredient(new Ingredient(itemNameString, itemAmmountNumber))      
    // } 
    //console.log(this.shoppingForm)
    const itemNameString = this.shoppingForm.value.name
    const itemAmmountNumber = this.shoppingForm.value.ammount
    if(this.editMode){
      //this.shoppingListService.updateIngredient(this.editedItemIndex, new Ingredient(itemNameString, itemAmmountNumber))
      // this.store.dispatch(new ShoppingListActions.UpdateIngredient({index: this.editedItemIndex, ingredient: {name: itemNameString, ammount: itemAmmountNumber}}))
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(new Ingredient(itemNameString, itemAmmountNumber)))
    }else{
      if(itemAmmountNumber>0 && itemNameString!=''){
        //this.shoppingListService.addIngredient(new Ingredient(itemNameString, itemAmmountNumber))
        this.store.dispatch(new ShoppingListActions.AddIngredient(new Ingredient(itemNameString, itemAmmountNumber)))      
      }      
    }
    this.editMode = false;
    shoppingForm.reset()
    
  } 
  onClear(){
    this.shoppingForm.reset()
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit())
  } 

  onDelete(){
    //this.shoppingListService.deleteIngredient(this.editedItemIndex)
    // this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editedItemIndex))
    this.store.dispatch(new ShoppingListActions.DeleteIngredient())
    this.onClear()
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
    this.store.dispatch(new ShoppingListActions.StopEdit())
  }
}
