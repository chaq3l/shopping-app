import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipe.service';
//import { Recipe } from './recipe.model'

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  //selectedRecipe = new Recipe('Recipe Name', 'Description', '')
  
  //constructor(private recipeService:RecipeService) { }
  constructor() { }
  //selectedRecipe!: Recipe
  ngOnInit(): void {
    // this.recipeService.selectedRecipe.subscribe(
    //   (recipe:Recipe) => {
    //     this.selectedRecipe=recipe
    //   }
    // )
  }

  

}
