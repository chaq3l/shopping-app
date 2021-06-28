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
                    return igIndex !== state.editedIngredientIndex;
                }),
                editedIngredientIndex: -1,
                editedIngredient: undefined
            };
        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedIngredientIndex]
            const updateIngredient = {
                ...ingredient,
                ...action.payload
            };
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex]=updateIngredient
            return {
                ...state,
                ingredients : updatedIngredients,
                editedIngredientIndex: -1,
                editedIngredient: undefined
            }
        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: {...state.ingredients[action.payload]}
            }
        case ShoppingListActions.STOP_EDIT:
            return{
                ...state,
                editedIngredient: undefined,
                editedIngredientIndex: -1
            }
        default:
            //console.log(state)
            return state;
    }
}