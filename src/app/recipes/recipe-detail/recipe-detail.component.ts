import { Component, OnInit, Input } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model'
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe! : Recipe 
  constructor(private recipeService:RecipeService) { }
  onClickShowButtonGroup:string ="bnt-group"
  ngOnInit(): void {
  }
  showButtonGroup(){
    if(this.onClickShowButtonGroup!="bnt-group open"){
      this.onClickShowButtonGroup="bnt-group open"
    }else{
      this.onClickShowButtonGroup="bnt-group"
    }
  }
  toShoppingList(){    
      this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
    }
  
}
