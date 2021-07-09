import { Recipe } from "../recipe.model";
import * as RecipesAction from "./recipe.action";

export interface RecipesState {
    recipes : Recipe[]
}

const initialState : RecipesState = {
    recipes : []
}

export function recipeReducer(
    state: RecipesState = initialState, 
    action : RecipesAction.RecipesAction):RecipesState{
        switch(action.type){
            case RecipesAction.SET_RECIPES:
                return{
                    ...state,
                    recipes: [...action.payload]
                };
            case RecipesAction.ADD_RECIPE:
                return {
                    ...state,
                    recipes: [...state.recipes, action.payload]
                };
            case RecipesAction.UPDATE_RECIPE:
                const newRecipe = action.payload.newRecipe
                //console.log(newRecipe)
                const updatedRecipe = {
                    ...state.recipes[action.payload.index],
                    ...action.payload.newRecipe}
                // const newRecipesList = state.recipes.forEach((recipe, index)=>{
                //     if(index===action.payload.index){
                //         recipe=newRecipe
                //     }                    
                // }) 
                //console.log(newRecipesList)     
                const updatedRecipesList = [...state.recipes];
                updatedRecipesList[action.payload.index]=updatedRecipe;          
                return{
                    ...state,
                    recipes: [...updatedRecipesList]
                    
                }
            case RecipesAction.DELETE_RECIPE:
                return{
                    ...state,
                    recipes: state.recipes.filter((recipe, index)=>{
                        return index !== action.payload})
                }

            default:
                return state;
        }
}