import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService
{
    ingredientsChanged = new Subject<Ingredient[]>();  //subject is work like same as event emitter
    startedEditing =  new Subject<number>();

   private ingredients: Ingredient[] = 
   [
        new Ingredient('Apples',5),
        new Ingredient('Tomatoes',7),
      
    ];

      getIngredients()
      {
          return this.ingredients.slice();
      }

      getIngredient(index: number)
      {
            return this.ingredients[index]; 
      }

      addIngredient(ingredient: Ingredient)
      {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
      }
      //subject uses "next()" methdd to emit
      //it works like an emit

      addIngredients(ingredients: Ingredient[])
      {
         /* for(let ingredient of ingredients)
          {
              this.addIngredient(ingredient);
          }*/
          this.ingredients.push(...ingredients);//es6 featurs "..." spread list of ingredients
          this.ingredientsChanged.next(this.ingredients.slice());

      }

      updateIngredient(index: number, newIngredient: Ingredient)
      {

        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      deleteIngredient(index: number)
      {
          this.ingredients.splice(index,1);
          this.ingredientsChanged.next(this.ingredients.slice());
      }

}