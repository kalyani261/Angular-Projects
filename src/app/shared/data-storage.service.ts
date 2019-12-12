import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../receipes/recipe.model';
import { RecipeService } from '../receipes/recipe.service';
import { map ,tap,take, exhaustMap} from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root' //or we can also provide it directly in the app.module.ts providers aray .so there is no need to write it here..

})
export class DataStorageService
{

    constructor(private http: HttpClient, private recipesService: RecipeService, private authService: AuthService){}

    storeRecipes()
    {
        const recipes = this.recipesService.getRecipes();
        this.http
        .put('https://ng-course-recipe-book-33612.firebaseio.com/recipes.json'
        ,recipes)
        .subscribe(response =>
        {
            console.log(response);
        });
    }


    fetchRecipes()
    {
        return this.authService.user.pipe(take(1),exhaustMap(user => {

            return this.http
        .get<Recipe[]>('https://ng-course-recipe-book-33612.firebaseio.com/recipes.json'
        
        ).pipe(
                        map(recipes =>
                    {
                            return recipes.map(recipe => 
                            {
                                return {...recipe, 
                                ingredients: recipe.ingredients ? recipe.ingredients : []
                                };
                            }
                            );
                    }
                    ),
            
                    tap(recipes =>
                        {
                            this.recipesService.setRecipes(recipes);
                        })
              );
    
            }))

}
}

// for firebase data connection  
//1.import the service in app.modulets import array
//2.create one service and inject the httpclient service in constructor of that service
//3.write one method and give the path of database in that service.
//4.subscribe the service of hhtpclient
//5. after that inject the custom service in where we want to add the data...in our projec in header
//6.call the method which is declared inside that service

