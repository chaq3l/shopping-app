import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

//import { AlertComponent } from './shared/alert/alert.component'
//import { RecipesModule } from './recipes/recipes.module';
//import { ShoppingModule } from './shopping-list/shopping.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
//import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';
// import { reducers}  from './shopping-list/store' ;
// import { authReducer } from './auth/store/auth.reducer';
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';
import { appReducer } from './store/app.reducer';
import { AuthEffects } from './auth/store/auth.effects';
//import { AuthModule } from './auth/auth.module';
//import { RecipeService } from './recipes/recipe.service'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    //AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(appReducer),  
    EffectsModule.forRoot([AuthEffects]),
    //AuthModule,
    //RecipesModule,
    SharedModule,
    //ShoppingModule,
    CoreModule    
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
