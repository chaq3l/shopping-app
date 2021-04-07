
import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model'

export class ShoppingListService {
    transmitWhileAddingIngredient=new EventEmitter<Event>()
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 5)
    ];
    getIngrediets(){
        return this.ingredients.slice()
    }
    addIngredient(ingredient:Ingredient){
        this.ingredients.push(ingredient)
        this.transmitWhileAddingIngredient.emit()
    }

    addIngredients(ingredients:Ingredient[]){
        // for (var ingredient of ingredients){
        //     this.addIngredient(ingredient)}
        this.ingredients.push(...ingredients)
        this.transmitWhileAddingIngredient.emit()
    }

}