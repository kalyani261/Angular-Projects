import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReceipesComponent } from './receipes/receipes.component';
import { ReceipesListComponent } from './receipes/receipes-list/receipes-list.component';
import { ReceipesDetailsComponent } from './receipes/receipes-details/receipes-details.component';
import { ReceipeItemComponent } from './receipes/receipes-list/receipe-item/receipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component'
import { DropdownDirective } from './shared/dropdown.directive';
import { RecipeService } from './receipes/recipe.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
//import { RecipeStartComponent } from './reciepes/recipe-start/recipe-start.component';
import { RecipeStartComponent } from './receipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './receipes/recipe-edit/recipe-edit.component';
import { DataStorageService } from './shared/data-storage.service';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loadding spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ReceipesComponent,
    ReceipesListComponent,
    ReceipesDetailsComponent,
    ReceipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    RecipeService,
    DataStorageService,
    ShoppingListService,
    RecipeStartComponent,
    RecipeEditComponent,
    AuthComponent,
    LoadingSpinnerComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ ShoppingListService,RecipeService, {provide: HTTP_INTERCEPTORS, 
    useClass: AuthInterceptorService,
  multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
