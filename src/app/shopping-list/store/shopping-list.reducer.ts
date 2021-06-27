import { State } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from './shopping-list.actions';


export interface ShoppingListState{
    ingredients: Ingredient[];
    editedIngredient?: Ingredient;
    editedIngredientIndex: number;    
}

export interface AppState {
    shoppingList: ShoppingListState;
}

const initialState : ShoppingListState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 5),
    ],
    editedIngredient: undefined,
    editedIngredientIndex: -1
};


export function shoppingListReducer(
    state : ShoppingListState = initialState, 
    action: ShoppingListActions.ShoppingListActions) : ShoppingListState{
    switch(action.type){
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state, 
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            // const newIngredientState = [...state.ingredients]
            // newIngredientState.splice(action.payload,1)
            return {
                ...state,
                //ingredients: newIngredientState
                ingredients :  state.ingredients.filter((ig, igIndex) => {
                    return igIndex !== action.payload;
                })
            };
        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[action.payload.index]
            const updateIngredient = {
                ...ingredient,
                ...action.payload.ingredient
            };
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[action.payload.index]=updateIngredient
            return {
                ...state,
                ingredients : updatedIngredients
            }
        default:
            //console.log(state)
            return state;
    }
}