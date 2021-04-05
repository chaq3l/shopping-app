import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html'
})
export class ShoppingListComponent {
ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 5)
];
    constructor() { }

    ngOnInit(): void {
    }
    addIngredient(ingredient:{item: string, ammount: number}){
        this.ingredients.push(new Ingredient( ingredient.item, ingredient.ammount)) 
    }

}