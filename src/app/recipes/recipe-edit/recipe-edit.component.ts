import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

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
  }

  onDelete(){

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
              'ingredientName' : new FormControl(ingredient.name),
              'ingredientAmmount' : new FormControl(ingredient.ammount)
            })
          )
          //console.log(recipeIngredients)
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath' : new FormControl(recipeImagePath),
      'description' : new FormControl(recipeDescription),
      'ingredients' : recipeIngredients
    });
  }

  get controls() { // a getter!    
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

}
