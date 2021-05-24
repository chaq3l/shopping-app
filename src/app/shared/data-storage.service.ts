import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http'
import { map, tap, take, exhaustMap } from 'rxjs/operators'

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, 
        private  recipeService: RecipeService,
        private authService: AuthService
        ) {
     
    }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-recipe-book-1526e-default-rtdb.firebaseio.com/recipes.json', recipes)
        .subscribe(response => {
            console.log(response)
        });
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
            this.recipeService.setRecipes(recipes)
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