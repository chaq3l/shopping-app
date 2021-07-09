import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model'

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input('recipeItem') recipe!: Recipe;
  @Input('recipeId') id!:number
  
  constructor() { }

  ngOnInit(): void {
  }

  // onClickSelectRecipy(recipe:Recipe) {  
  //   //emitting recipe is not necessary in this case. It can be made in html (and it is)  
  //   this.recipeService.serveRecipeClick(recipe)
      
  // }
}
