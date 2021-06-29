//import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
//import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model'
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions'
import * as fromAppState from '../store/app.reducer'

@Injectable()
export class RecipeService {
    recipeChanged = new Subject<Recipe[]>()
    
    //selectedRecipe = new Subject<Recipe>();
    private recipes: Recipe[] = [
        // new Recipe('Schabowy z frytkami', 'Kotlet schabowy - smakuje jak u mamy',
        //  'https://restaumatic.imgix.net/uploads/accounts/25318/media_library/31c1ab1b-d577-496e-afce-db66fc5fa7dd.jpg?auto=compress&blur=0&crop=focalpoint&fit=max&fp-x=0.5&fp-y=0.5&h=auto&rect=0%2C0%2C1230%2C600&w=1200', 
        //  [
        //    new Ingredient('Meat', 1),
        //    new Ingredient('French fries', 10)
        //  ]), 


        //  new Recipe('Schabowy z frytkami2', 'Kotlet schabowy2 - smakuje jak u mamy',
        //  'https://restaumatic.imgix.net/uploads/accounts/25318/media_library/31c1ab1b-d577-496e-afce-db66fc5fa7dd.jpg?auto=compress&blur=0&crop=focalpoint&fit=max&fp-x=0.5&fp-y=0.5&h=auto&rect=0%2C0%2C1230%2C600&w=1200', 
        //  [
        //    new Ingredient('Meat', 1),
        //    new Ingredient('French fries', 10)
        //  ]), 

         
        // new Recipe('Burger', 'Najlepszy burger w mieście',
        // 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlguOqJx89wzzpXelC4EEjF3n4FoaaimPlDQ&usqp=CAU',
        // [
        //   new Ingredient('Meat', 1),
        //   new Ingredient('Buns', 1),
        //   new Ingredient('Chinese cabbage', 1)

        // ]),

        // new Recipe('Burger2', 'Najlepszy burger2 w mieście',
        // 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlguOqJx89wzzpXelC4EEjF3n4FoaaimPlDQ&usqp=CAU',
        // [
        //   new Ingredient('Meat', 1),
        //   new Ingredient('Buns', 1),
        //   new Ingredient('Chinese cabbage', 1)
        // ]),
        // new Recipe('Burger3', 'Najlepszy burger3 w mieście',
        // 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlguOqJx89wzzpXelC4EEjF3n4FoaaimPlDQ&usqp=CAU',
        // [
        //   new Ingredient('Meat', 1),
        //   new Ingredient('Buns', 1),
        //   new Ingredient('Chinese cabbage', 1)

        // ])
      ];

      constructor(
        private store : Store<fromAppState.AppState>
        ){}
     
      //selectedRecipe= new Recipe('Empty recipe', 'This is empty recipe from RecipeService. If you see this there is probably an error in application', '')
      
      // serveRecipeClick(recipe:Recipe){
      //   this.selectedRecipe.next(recipe)            
      // }
      getRecipes(){
        return this.recipes.slice()
      }
      addIngredientsToShoppingList(ingredientList:Ingredient[]){        
          //this.shoppingListService.addIngredients(ingredientList) 
          this.store.dispatch(new ShoppingListActions.AddIngredients(ingredientList))       
      }
      
      getRecipeByName(name:string){
        const recipe = this.recipes.find((recipe) => { return recipe.name===name});        
        if (recipe!=undefined){
          console.log(recipe.name, recipe.description)
          return recipe
        }else {return this.recipes[0]}        
      }

      getRecipeByID(id:number){
        const recipe = this.recipes[id];              
        if (recipe!=undefined){          
          return recipe
        }else {return this.recipes[0]}        
      }

      addRecipe(recipe:Recipe){
        this.recipes.push(recipe)
        this.recipeChanged.next(this.recipes.slice())
      }

      updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe
        this.recipeChanged.next(this.recipes.slice())
      }

      deleteRecipe(index: number){
        this.recipes.splice(index, 1)
        this.recipeChanged.next(this.recipes.slice())
      }

      setRecipes(recipes: Recipe[]){
        // const fetchedRecipes : Recipe[] = []
        // fetchedRecipes.push(...this.dataStorageSercice.fetchRecipes())
        // this.recipes = this.dataStorageSercice.fetchRecipes()

        this.recipes = recipes
        this.recipeChanged.next(this.recipes.slice())
      }
}
