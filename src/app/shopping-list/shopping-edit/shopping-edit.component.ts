import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

//import { EventEmitter } from 'events';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
          @ViewChild('f') slForm: NgForm;

          subcription: Subscription;
          editmode = false;
          editedItemIndex:number;
          editedItem: Ingredient;

        /*@ViewChild('nameInput') nameInputRef: ElementRef;
        @ViewChild('amountInput') amountInputRef: ElementRef;

        //@Output() ingredientAdded = new EventEmitter<Ingredient>();
        //we use output here bcz alow it to listen outside so...*/
          constructor(private slService:ShoppingListService) { }

          ngOnInit() 
          {

                  this.subcription = this.slService.startedEditing
                  .subscribe(
                    (index: number) =>
                    {
                      this.editedItemIndex = index;
                      this.editmode = true;
                      this.editedItem = this.slService.getIngredient(index);
                      this.slForm.setValue({
                        name: this.editedItem.name,
                        amount: this.editedItem.amount
                      })
                    }

                   );
          }


              onSubmit(form: NgForm)
              {

                    //here we emit an  event to pass the this data to the parent component
                      //here we use constant because we dont want to change the values of varibles
                      /*const ingName = this.nameInputRef.nativeElement.value;
                      const ingAmount = this.amountInputRef.nativeElement.value;*/

                  const value = form.value;
                  const newIngredient = new Ingredient(value.name, value.amount);
              //this.ingredientAdded.emit(newIngredient);

                      if(this.editmode)
                      {
                        this.slService.updateIngredient(this.editedItemIndex, newIngredient);
                      }
                      else
                      {
                        this.slService.addIngredient(newIngredient);
                      }
                      this.editmode = false;
                      form.reset();

                }

                onClear()
                {
                  this.slForm.reset();
                  this.editmode=false;
                }
      
                onDelete()
                {
                  this.slService.deleteIngredient(this.editedItemIndex);
                  this.onClear();

                }


                ngOnDestroy(): void //it used for to cleanup th subcription
                {
          
                  this.subcription.unsubscribe();
                }
                

}
