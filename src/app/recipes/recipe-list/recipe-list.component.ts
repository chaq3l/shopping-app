import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() emitSelectedRecipeFromRecipeList = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('A test Recipe', 'This is sipmly test',
     'https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_1280.png'), 
     
    new Recipe('A second test Recipe', 'This is sipmly test 2',
    'https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_1280.png')
  ];
  constructor() { }

  ngOnInit(): void {
  }
  emitSelectedRecipe(recivedRecipe:Recipe){
    this.emitSelectedRecipeFromRecipeList.emit(recivedRecipe)
  }
}
