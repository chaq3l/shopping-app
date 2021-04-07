import { Component, OnInit, Input } from '@angular/core';
import { RecipeService } from 'src/app/recipes/recipe.service';
import { Recipe } from '../../recipe.model'

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input('recipeItem') recipe!: Recipe;
  
  constructor(private recipeService:RecipeService) { }

  ngOnInit(): void {
  }

  onClickSelectRecipy(recipe:Recipe) {  
    //emitting recipe is not necessary in this case. It can be made in html (and it is)  
    this.recipeService.serveRecipeClick(recipe)
      
  }
}
