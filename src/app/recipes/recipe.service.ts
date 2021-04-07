import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model'
@Injectable()
export class RecipeService {
  
    private recipes: Recipe[] = [
        new Recipe('Schabowy z frytkami', 'Kotlet schabowy - smakuje jak u mamy',
         'https://restaumatic.imgix.net/uploads/accounts/25318/media_library/31c1ab1b-d577-496e-afce-db66fc5fa7dd.jpg?auto=compress&blur=0&crop=focalpoint&fit=max&fp-x=0.5&fp-y=0.5&h=auto&rect=0%2C0%2C1230%2C600&w=1200', 
         [
           new Ingredient('Meat', 1),
           new Ingredient('French fries', 10)
         ]), 
         
        new Recipe('Burger', 'Najlepszy burger w mieście',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlguOqJx89wzzpXelC4EEjF3n4FoaaimPlDQ&usqp=CAU',
        [
          new Ingredient('Meat', 1),
          new Ingredient('Buns', 1),
          new Ingredient('Chinese cabbage', 1)
        ])
      ];

      constructor(private shoppingListService:ShoppingListService){}
      //selectedRecipe= new Recipe('Empty recipe', 'This is empty recipe from RecipeService. If you see this there is probably an error in application', '')
      selectedRecipe = new EventEmitter<Recipe>();
      serveRecipeClick(recipe:Recipe){
        this.selectedRecipe.emit(recipe)            
      }
      getRecipes(){
        return this.recipes.slice()
      }
      addIngredientsToShoppingList(ingredientList:Ingredient[]){        
          this.shoppingListService.addIngredients(ingredientList)        
      }
}