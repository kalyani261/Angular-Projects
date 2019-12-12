import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceipesComponent } from './receipes/receipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './receipes/recipe-start/recipe-start.component';
import { ReceipesDetailsComponent } from './receipes/receipes-details/receipes-details.component';
import { RecipeEditComponent } from './receipes/recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './receipes/recipes-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [

  {
    path: '', 
    redirectTo:'/receipes',
    pathMatch: 'full'
  },

  {
    path: 'receipes', component: ReceipesComponent,
    
    canActivate: [AuthGuard],
    
    children: [

      {
        path: '', component:RecipeStartComponent
      },

      {
        path: 'new', component:RecipeEditComponent
      },

      {
        path: ':id', component:ReceipesDetailsComponent, 
        resolve: [RecipesResolverService]
      },

      
      {
        path: ':id/edit', component:RecipeEditComponent,
        resolve: [RecipesResolverService]
      },
    ]
   },


  {
    path: 'shopping-list', component: ShoppingListComponent
  },

  {
    path: 'auth', component: AuthComponent
  }

];
//ngModule is used to transform angular class into normal typescript class 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
