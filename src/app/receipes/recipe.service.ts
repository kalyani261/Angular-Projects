//this service is used to managd recipes..means for recipe list which is maintains in recipe list compo,...

import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';


@Injectable()

export class RecipeService
{

    recipesChanged = new Subject<Recipe[]>();

//make it private so that it cannot acess directly outside ..
    /*private recipes: Recipe[] = [
        new Recipe('A Test Receipe', 
        'This is simply a test', 
        'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg'
        ,[
            new Ingredient('Meat',1),
            new Ingredient('French fries',20)
        ]),

        new Recipe('Simple recipe', 
        'This is basic receipe', 
        'https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_960_720.png',
        [
            new Ingredient('Buns',2),
            new Ingredient('Meat',1)
        ]),

        new Recipe('Kichen recipe', 
        'To make chapati', 
        'https://www.bizsale.com/media/k2/items/cache/1d36d23b156ead252433d4ce2c21c387_XL.jpg',
        [
            new Ingredient('Water',1),
            new Ingredient('salt',1)
        ]),
        new Recipe('sample', 
        'To make dish', 
        'https://www.bizsale.com/media/k2/items/cache/1d36d23b156ead252433d4ce2c21c387_XL.jpg',
        [
            new Ingredient('Water',1),
            new Ingredient('salt',1)
        ]),

      ]; 
*/
      private recipes: Recipe[] = [];

      constructor(private slService: ShoppingListService){}


      getRecipes()
      {
          return this.recipes.slice();
           //we used slice method here bcz we want to get copy of recipe array .not the original array.
           //due to slice method we only get copy ..original array remians as it is..
      }

      getRecipe(index: number)
      {
          return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[])
      {
        this.slService.addIngredients(ingredients);
      }


      addRecipe(recipe: Recipe)
      {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index:number, newRecipe: Recipe)
      {
          this.recipes[index] = newRecipe;
          this.recipesChanged.next(this.recipes.slice());


      }


      deleteRecipe(index: number)
      {
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
      }

      setRecipes(recipes: Recipe[])
      {
            this.recipes = recipes;
            this.recipesChanged.next(this.recipes.slice());
              }
}



















