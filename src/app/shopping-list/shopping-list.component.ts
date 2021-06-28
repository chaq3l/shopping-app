import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service'
import * as fromShoppingList from './store/shopping-list.reducer'
import * as ShoppingListActions from './store/shopping-list.actions'

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    ingredientsList!:Ingredient[]
    idChangeSub!: Subscription;
    ingredientsSub!: Subscription
    @Input() ingredients!: Observable<{ingredients: Ingredient[]}>

    constructor(
        private shoppingListService:ShoppingListService,        
        // private store: Store<{shoppingList: { ingredients: Ingredient[] }}>
        private store: Store<fromShoppingList.AppState>        
        ) {
            //this.ingredients = this.store.select('shoppingList')            
         }

    ngOnInit(): void {

        this.ingredientsSub = this.store.select('shoppingList').subscribe(
            (ingredient) => this.ingredientsList=ingredient.ingredients                
        )
        //this.ingredientsList = this.ingredientsControls
        console.log(this.ingredientsList)
        
        //this.ingredients = this.store.select('shoppingList')
        // console.log(this.ingredients)
        // this.ingredients = this.shoppingListService.getIngrediets()
        // this.idChangeSub = this.shoppingListService.transmitWhileAddingIngredient.subscribe(
        //     ()=>{
        //         this.ingredients=this.shoppingListService.getIngrediets()
        //     }
        // )
      //console.log(this.idChangeSub)
    }
    // get ingredientsControls():Ingredient[] { // a getter!
    //     var ingredientsControls:Ingredient[]
    //     this.ingredients.subscribe(function (ingredient){
    //         ingredientsControls = ingredient.ingredients                     
    //     });
    //     console.log(this.ingredientsControls)  
    //     return this.ingredientsControls
    //   }
    onEditItem(index:number){
        //this.shoppingListService.startedEditing.next(index)
        this.store.dispatch(new ShoppingListActions.StartEdit(index))
    }

    ngOnDestroy(): void{
        this.idChangeSub.unsubscribe();
        this.ingredientsSub.unsubscribe()
    }
    
}