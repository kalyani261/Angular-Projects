import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
//import { EventEmitter } from 'events';


@Component({
  selector: 'app-receipes-list',
  templateUrl: './receipes-list.component.html',
  styleUrls: ['./receipes-list.component.css']
})
export class ReceipesListComponent implements OnInit, OnDestroy {

//  @Output() recipeWasSelected = new EventEmitter<Recipe>(); //here the parameter recipe is passed which means an selected recipe
//here we create new varible recipewasselected bcz we dont access fro child ton child.. 

  //it is an empty array
    //'Recipe' <-- is an model name...which is an array of reciepe....

//Event emitter is used when we perform child to parent communication

recipes: Recipe[];
subscription: Subscription;
/* = [
  new Recipe('A Test Receipe', 'This is simply a test', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg'),
  new Recipe('Simple recipe', 'This is basic receipe', 'https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_960_720.png'),
  new Recipe('Kichen recipe', 'To make chapati', 'https://www.bizsale.com/media/k2/items/cache/1d36d23b156ead252433d4ce2c21c387_XL.jpg')
]; 
*/
  constructor(private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute) //dependancy injection of service is used here..
  { }

  ngOnInit() {
          this.subscription =  this.recipeService.recipesChanged.subscribe(
          (recipes: Recipe[]) => {
            this.recipes = recipes;
           }
      );
        this.recipes = this.recipeService.getRecipes();  //here we get the copy of recipe array..

  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }

  onNewRecipe()
  {
    this.router.navigate(['new'],{relativeTo: this.route});
  }


  /*onRecipeSelected(recipe: Recipe)
  {
    this.recipeWasSelected.emit(recipe);
  }*/

}
