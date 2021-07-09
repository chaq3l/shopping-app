import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Actions, ofType } from "@ngrx/effects";
import { map, switchMap, take } from "rxjs/operators";

import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import * as fromApp from './../store/app.reducer'
import * as RecipesAction from '../recipes/store/recipe.action'
import { of } from "rxjs";

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {
    constructor(
        private store: Store<fromApp.AppState>,
        private actions$ : Actions
        ){}
    recipes : Recipe[] = [new Recipe('Dummy','Dummy','Dummy',[] )]
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        //const recipes = this.recipeService.getRecipes()
        
        // const recipes = this.store.select('recipes').subscribe(
        //     recipe=>{
        //         this.recipes=recipe.recipes

        //     }             
        // )
        // console.log(this.recipes)
        return this.store.select('recipes').pipe(
            take(1),
            map(recipesState =>{
            return recipesState.recipes;
        }), 
        switchMap( recipes => {
            if(recipes.length ===0){
                this.store.dispatch(new RecipesAction.FetchRecipes())
                return this.actions$.pipe(ofType(RecipesAction.SET_RECIPES), 
                take(1)
                );
            }  else{
                return of(recipes)
            }          
        })
        )
        this.store.dispatch(new RecipesAction.FetchRecipes())
        return this.actions$.pipe(ofType(RecipesAction.SET_RECIPES), take(1));
        // if(this.recipes.length=== 0){
        //     return this.actions$.pipe(ofType(RecipesAction.FETCH_RECIPES), take(1));
            
        // }else {
        //     return this.actions$.pipe(ofType(RecipesAction.SET_RECIPES), take(1));
        // }
        //return this.actions$.pipe(ofType(RecipesAction.SET_RECIPES), take(1));
        
    }
}