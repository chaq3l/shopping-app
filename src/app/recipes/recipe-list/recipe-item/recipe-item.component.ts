import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model'

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input('recipeItem') recipe!: Recipe;
  @Output() emitRecipe = new EventEmitter<Recipe>();
  constructor() { }

  ngOnInit(): void {
  }

  onClickSelectRecipy() {  
    //emitting recipe is not necessary in this case. It can be made in html (and it is)  
    this.emitRecipe.emit(this.recipe)
  }
}
