import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path:'', redirectTo: '/recipe', pathMatch: 'full'},
  { path:'shopping-list', component: ShoppingListComponent },
  { path:'recipe', component: RecipesComponent, children:[
    { path:'', component: RecipeStartComponent },
    { path: 'new', component: RecipeEditComponent },
    // { path: ':id/edit', component: RecipeEditComponent  },
    // { path:':id', component: RecipeDetailComponent }
    { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]  },
    { path:':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] }
  ]},
  { path: 'auth', component: AuthComponent },
  { path: '**', redirectTo: '/recipe'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
