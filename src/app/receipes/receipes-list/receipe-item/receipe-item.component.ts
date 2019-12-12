import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
//import { RecipeService } from '../../recipe.service';
//import { EventEmitter } from 'events';

@Component({
  selector: 'app-receipe-item',
  templateUrl: './receipe-item.component.html',
  styleUrls: ['./receipe-item.component.css']
})
export class ReceipeItemComponent implements OnInit {

  @Input() recipe: Recipe;
  @Input() index: number;
  //@Input is used for to get data from outside 

 //@Output() recipeSelected = new EventEmitter<void>();
  //constructor(private recipeService:RecipeService) { }

  ngOnInit() {
  }


  /*onSelected()
  {
    //this.recipeSelected.emit();
    this.recipeService.recipeSelected.emit(this.recipe);



  }*/

}
