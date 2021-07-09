import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model'
import { ActivatedRoute, Params, Router  } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import * as fromApp from '../../store/app.reducer'
import * as RecipeActions from '../store/recipe.action'
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions'

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  id!:number
  recipe! : Recipe
  paramsSubscription! : Subscription; 
  constructor(
    private store : Store<fromApp.AppState>,    
    private router:Router, 
    private route:ActivatedRoute
    ) { }
  onClickShowButtonGroup:string ="bnt-group"
  ngOnInit(): void {
    //this.route.params
    this.paramsSubscription=this.route.params
      .pipe(
        map(params=>{
        return +params['id'];
      }), 
      switchMap(id => {
        this.id=id;
        return this.store.select('recipes');
      }),
      map(recipesState => {
        return recipesState.recipes.find((recipe, index)=>{
          return index === this.id;
        });
      })
    )      
    .subscribe(recipe => {
      if(recipe!=undefined){
        this.recipe = recipe
      }else{
        this.recipe = new Recipe('Dummy','Dummy','',[])
      }        
    })
        
    //this.id = Number(this.route.snapshot.params['id'])
    //this.recipe = this.recipeService.getRecipeByID(this.id);
    // this.paramsSubscription=this.route.params
    // .subscribe(
    //   (params:Params)=> {
    //     this.id = +params['id']
    //     //this.recipe = this.recipeService.getRecipeByID(+params['id'])
    //   this.store.select('recipes').pipe(map(recipesState => {
    //     return recipesState.recipes.find((recipe, index)=>{
    //       return index === this.id
    //     })
    //   })
    //   ).subscribe(recipe => {
    //     if(recipe!=undefined){
    //       this.recipe = recipe
    //     }else{
    //       this.recipe = new Recipe('Dummy','Dummy','',[])
    //     }
        
    //   })
    // })
  }
  showButtonGroup(){
    //console.log("manage recipe click")
    if(this.onClickShowButtonGroup!="bnt-group open"){
      this.onClickShowButtonGroup="bnt-group open"
    }else{
      this.onClickShowButtonGroup="bnt-group"
    }
  }
  toShoppingList(){    
      //this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)      
      this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients))      
      this.onClickShowButtonGroup="bnt-group"
    }
  
    // onEdit(){
    //   this.router.navigate(['edit'], { relativeTo: this.route })
    //   // this.router.navigate([String(this.id),'/edit'], { relativeTo: this.route })
    // }

    onDelete(){
      this.store.dispatch(new RecipeActions.DeleteRecipe(this.id))
      //this.recipeService.deleteRecipe(this.id)
      //this.router.navigate(['/recipe'])
      this.router.navigate(['../'], {relativeTo: this.route})
    }
}
