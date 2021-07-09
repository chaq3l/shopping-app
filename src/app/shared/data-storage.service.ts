import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { map, tap } from 'rxjs/operators'
import { Store } from "@ngrx/store";


import { Recipe } from "../recipes/recipe.model";
import * as fromAppState from '../store/app.reducer'
import * as RecipesAction from '../recipes/store/recipe.action'


@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient,
        private store: Store<fromAppState.AppState>
        ) {
     
    }

    storeRecipes() {
        //const recipes = this.recipeService.getRecipes();
        // this.http.put('https://ng-recipe-book-1526e-default-rtdb.firebaseio.com/recipes.json', recipes)
        // .subscribe(response => {
        //     console.log(response)
        // });
    }

    fetchRecipes() {        
        //console.log(this.authService.user)
        return this.http.get<Recipe[]>(                
            'https://ng-recipe-book-1526e-default-rtdb.firebaseio.com/recipes.json')
            .pipe(
                map(recipes => { //rxjs array method
                return recipes.map( (recipe) => { //js array method
                    //console.log({...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []})
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}                
                
            }); 
       }), tap(recipes => {
            //this.recipeService.setRecipes(recipes)
            this.store.dispatch(new RecipesAction.SetRecipes(recipes))
       })
       )

    //    return this.http.get<Recipe[]>('https://ng-recipe-book-1526e-default-rtdb.firebaseio.com/recipes.json')
    //    .pipe(map(recipes => { //rxjs array method
    //         return recipes.map( recipe => { //js array method
    //             console.log({...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []})
    //             return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}                
                
    //         }); 
    //    }), tap(recipes => {
    //         this.recipeService.setRecipes(recipes)
    //    })
    //    )        
    }
}