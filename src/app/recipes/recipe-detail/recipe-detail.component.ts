import { Component, OnInit, Input} from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model'
import { ActivatedRoute, Params, Router  } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  id!:number
  recipe! : Recipe
  paramsSubscription! : Subscription; 
  constructor(private recipeService:RecipeService, private router:Router, private route:ActivatedRoute) { }
  onClickShowButtonGroup:string ="bnt-group"
  ngOnInit(): void {
    this.route.params
    this.id = Number(this.route.snapshot.params['id'])
    this.recipe = this.recipeService.getRecipeByID(this.id);
    this.paramsSubscription=this.route.params.subscribe(
      (params:Params)=> this.recipe = this.recipeService.getRecipeByID(+params['id']) 
    )
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
      this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
      this.onClickShowButtonGroup="bnt-group"
    }
  
    // onEdit(){
    //   this.router.navigate(['edit'], { relativeTo: this.route })
    //   // this.router.navigate([String(this.id),'/edit'], { relativeTo: this.route })
    // }

    onDelete(){
      this.recipeService.deleteRecipe(this.id)
      //this.router.navigate(['/recipe'])
      this.router.navigate(['../'], {relativeTo: this.route})
    }
}
