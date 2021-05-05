import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recipe.model';

import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id!:number
  editMode = false;
  recipeForm!:FormGroup

  constructor(private route:ActivatedRoute, private recipeService : RecipeService) { }

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
    console.log(this.recipeForm)
    // const newRecipe = new Recipe(
    //   this.recipeForm.value('name'),
    //   this.recipeForm.value('discription'),
    //   this.recipeForm.value('imagePath'),
    //   this.recipeForm.value('ingredients'))

    if(this.editMode){
      this.recipeService.updateRecipe(Number(this.id), this.recipeForm.value)
    }else{
      this.recipeService.addRecipe(this.recipeForm.value)
    }
    //this.recipeForm.reset
  }

  onDelete(){

  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup(        {
          'ingredientName' : new FormControl(null, Validators.required),
          'ingredientAmmount' : new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
        })
    )
  }

  private initForm(){    
    let recipeName = ''
    let recipeImagePath = '';
    let recipeDescription = ''
    let recipeIngredients = new FormArray([]);

    if (this.editMode){
      const recipe = this.recipeService.getRecipeByID(this.id);
      recipeName = recipe.name
      recipeImagePath = recipe.imagePath
      recipeDescription = recipe.description
      if(recipe['ingredients']){
        for (let ingredient of recipe.ingredients){
          //console.log(ingredient.name, ingredient.ammount)
          recipeIngredients.push(
            new FormGroup({
              'ingredientName' : new FormControl(ingredient.name, Validators.required),
              'ingredientAmmount' : new FormControl(ingredient.ammount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
          //console.log(recipeIngredients)
        }
      }
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

}
