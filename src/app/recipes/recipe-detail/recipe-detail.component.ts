import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model'

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() displayRecipe! : Recipe 
  constructor() { }
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
}
