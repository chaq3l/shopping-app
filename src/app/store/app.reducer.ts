import { ActionReducerMap } from "@ngrx/store";

import * as fromShoppingListStore from '../shopping-list/store/shopping-list.reducer'
import * as fromAuthStore from '../auth/store/auth.reducer'
import * as fromRecipesStore from '../recipes/store/recipe.reducer'

export interface AppState {
    shoppingList: fromShoppingListStore.ShoppingListState;
    auth: fromAuthStore.State;
    recipes: fromRecipesStore.RecipesState
}

export const appReducer : ActionReducerMap<AppState, any> = {
    shoppingList : fromShoppingListStore.shoppingListReducer,
    auth : fromAuthStore.authReducer,
    recipes : fromRecipesStore.recipeReducer
};