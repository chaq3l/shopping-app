import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import * as fromApp from '../../store/app.reducer'
import * as RecipeActions from '../store/recipe.action'

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id!:number
  editMode = false;
  recipeForm!:FormGroup
  private storeSub?: Subscription

  constructor(
    
    private route:ActivatedRoute,
    private router:Router,
    private store : Store<fromApp.AppState>
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id=+params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  onSubmit(){
    //console.log(this.recipeForm)

    // const newRecipe = new Recipe(
    //   this.recipeForm.value('name'),
    //   this.recipeForm.value('discription'),
    //   this.recipeForm.value('imagePath'),
    //   this.recipeForm.value('ingredients'))

    if(this.editMode){
      this.store.dispatch(new RecipeActions.UpdateRecipe({
        index:Number(this.id), 
        newRecipe:this.recipeForm.value}))
      //this.recipeService.updateRecipe(Number(this.id), this.recipeForm.value)
      //console.log(this.recipeForm.value)
    }else{
      this.store.dispatch(new RecipeActions.AddRecipe(this.recipeForm.value))
      //this.recipeService.addRecipe(this.recipeForm.value)      
    }
    this.router.navigate(['recipe'])
    //this.recipeForm.reset
  }

  onCnancel(){
    //this.router.navigate(['recipe'])
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup(        {
          'name' : new FormControl(null, Validators.required),
          'ammount' : new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
        })
    )
  }

  onClearIngredients(){
    (<FormArray>this.recipeForm.get('ingredients')).clear()
  }

  private initForm(){    
    let recipeName = ''
    let recipeImagePath = '';
    let recipeDescription = ''
    let recipeIngredients = new FormArray([]);

    if (this.editMode){
      //const recipe = this.recipeService.getRecipeByID(this.id);
      //const recipe = 
      this.storeSub = this.store.select('recipes').pipe(map(recipeState=> {
        return recipeState.recipes.find((recipe,index)=> index===this.id)
      })).subscribe(recipe=>{
        if(recipe!=undefined){
          recipeName = recipe.name
          recipeImagePath = recipe.imagePath
          recipeDescription = recipe.description
          if(recipe['ingredients']){
            for (let ingredient of recipe.ingredients){
              //console.log(ingredient.name, ingredient.ammount)
              recipeIngredients.push(
                new FormGroup({
                  'name' : new FormControl(ingredient.name, Validators.required),
                  'ammount' : new FormControl(ingredient.ammount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
                })
              )
              //console.log(recipeIngredients)
            }
          }
        }        
      })
      
      
      
      
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath' : new FormControl(recipeImagePath, Validators.required),
      'description' : new FormControl(recipeDescription, Validators.required),
      'ingredients' : recipeIngredients
    });
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  ngOnDestroy(){
    this.storeSub?.unsubscribe()
  }
}
