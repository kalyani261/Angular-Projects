/*import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive(
    {
        selector: '[app-dropdown]'
    }
)

export class DropdownDirective {

    @HostBinding('class.open') isOpen = false;  //here class is  an array of all the classes
@HostListener('click') toggleOpen()
{
this.isOpen = !this.isOpen;
}


}*/


//by below code we can close our dropdwon list from clcking anywhere on the page...
//by above code we have to close dropdown manually by clicking on dropwdown list...



import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';
 
@Directive({
  selector: '[app-dropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
  constructor(private elRef: ElementRef) {}
}


