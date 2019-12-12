import { Component, OnInit } from '@angular/core';
import { SelectorContext } from '@angular/compiler';
//import { EventEmitter } from 'events';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';


@Component(
    {
        selector: 'app-header',
    templateUrl: './header.component.html'    }
)



export class HeaderComponent implements OnInit

{

    private userSub: Subscription;
    isAuthenticated = false;
  // @Output() featureSelected = new EventEmitter<string>(); //generic type e so..   @Output() is used to listen from app(parent) component
   /* onSelect(feature: string)
    {
this.featureSelected.emit(feature);
    }*/

    constructor(private dataStorageService: DataStorageService, private authService: AuthService){}


    // " !!user " is  works like same as " !user  ? false : true; "
    ngOnInit()
    {
       this.userSub =  this.authService.user.subscribe(user => {
           this.isAuthenticated = !!user;
           console.log(!user);
           console.log(!!user);

       });
    }

    onSaveData()
    {
this.dataStorageService.storeRecipes();
console.log("data saved succesfully in databse");
    }

    onFetchData()
    {
        this.dataStorageService.fetchRecipes().subscribe();
    }
    
    onLogout()
    {
        this.authService.logout();
    }

}