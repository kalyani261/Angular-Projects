import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-receipes-details',
  templateUrl: './receipes-details.component.html',
  styleUrls: ['./receipes-details.component.css']
})
export class ReceipesDetailsComponent implements OnInit {

  //@Input() 
  recipe: Recipe;  //@Input decorator used for to binding this compo for outside 
  id: number;
  constructor(private recipeService:RecipeService,
   private route: ActivatedRoute,
   private router: Router ) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) =>
      {

        this.id= +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }

    );
  }

  onAddToShoppingList()
  {
this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);

  }

  onEditRecipe()
  {
    this.router.navigate(['edit'], {relativeTo: this.route})
    //this.router.navigate(['../',this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe()
  {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/receipes']);
  }

}
