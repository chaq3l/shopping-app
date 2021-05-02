//import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs'

import { Ingredient } from '../shared/ingredient.model'

export class ShoppingListService {
    transmitWhileAddingIngredient=new Subject<Ingredient[]>()
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 5)
    ];
    getIngrediets(){
        return this.ingredients.slice()
    }
    addIngredient(ingredient:Ingredient){
        this.ingredients.push(ingredient)
        this.transmitWhileAddingIngredient.next(this.ingredients.slice())
    }

    addIngredients(ingredients:Ingredient[]){
        // for (var ingredient of ingredients){
        //     this.addIngredient(ingredient)}
        this.ingredients.push(...ingredients)
        this.transmitWhileAddingIngredient.next(this.ingredients.slice())
    }

    getIngredient(index: number){
        return this.ingredients[index]
    }

    updateIngredient(index : number, newIngredient: Ingredient){
        this.ingredients[index] = newIngredient
        this.transmitWhileAddingIngredient.next(this.ingredients.slice())
        
    }

    deleteIngredient(index : number){
        this.ingredients.slice(index, 1)
        //console.log(this.ingredients[index].name, this.ingredients.splice(index, 1))
        this.transmitWhileAddingIngredient.next(this.ingredients.slice())        
        
    }
}