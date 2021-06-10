import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

//import { AlertComponent } from './shared/alert/alert.component'
//import { RecipesModule } from './recipes/recipes.module';
//import { ShoppingModule } from './shopping-list/shopping.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
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
    //AuthModule,
    //RecipesModule,
    SharedModule,
    //ShoppingModule,
    CoreModule    
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
