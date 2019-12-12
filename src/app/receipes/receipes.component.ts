import { Component, OnInit } from '@angular/core';
//import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-receipes',
  templateUrl: './receipes.component.html',
  styleUrls: ['./receipes.component.css'],
 // providers: [RecipeService]
})
export class ReceipesComponent implements OnInit {

//selectedRecipe: Recipe;  //initalyy it not define bcz we are not assingning a value to it.

  constructor() { }

  ngOnInit() {
    
  }

}


/*(recipe: Recipe) => {
  this.selectedRecipe = recipe;   it is an arrow function
  */