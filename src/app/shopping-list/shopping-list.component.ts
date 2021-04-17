import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service'

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html'
})
export class ShoppingListComponent implements OnInit, OnDestroy {
ingredients: Ingredient[] = []
private idChangeSub!: Subscription;

    constructor(private shoppingListService:ShoppingListService) { }

    ngOnInit(): void {
        this.ingredients=this.shoppingListService.getIngrediets()
        this.idChangeSub = this.shoppingListService.transmitWhileAddingIngredient.subscribe(
            (event:Event)=>{
                this.ingredients=this.shoppingListService.getIngrediets()
            }
        )
    }
    ngOnDestroy(): void{
        this.idChangeSub.unsubscribe();
    }
    
}