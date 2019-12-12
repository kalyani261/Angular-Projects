import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscribable, Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
ingredients: Ingredient[] ;

private subscription: Subscription;
/*= [
  new Ingredient('Apples',5),
  new Ingredient('Tomatoes',7)

];*/
  constructor(private  slService:ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();

    this.subscription = this.slService.ingredientsChanged
    .subscribe(

      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;

      }
      );
  }

  ngOnDestroy(): void
  {

      this.subscription.unsubscribe();
  }

  onEditItem(index: number)
  {
    this.slService.startedEditing.next(index);

  }

  }

/*
  onIngredientAdded( ingredient: Ingredient)
  {

    this.ingredients.push(ingredient); //to insert values
  }
 */

