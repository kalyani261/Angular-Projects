import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError,tap } from 'rxjs/operators';
import { throwError ,BehaviorSubject} from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData //to write it is an optional,,but good programing prac tice in typescript to write interfcae
{
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable(
    {
        providedIn: 'root'
    }
)

export class AuthService
{

    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;
    //token: string  =  null;
    constructor(private http: HttpClient, private router: Router)
    {

    }

    signup(email: string, password: string )
    {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC02fWbKlQEIBlpi6l3R9bA9UUyHpCssj4',
            { 
                email: email,
                password: password,
                returnSecureToken:  true
            }
            
            )
            .pipe(catchError(
                this.handleError), tap(resData => {
                    this.handleAuthentication(resData.email,
                         resData.localId,
                          resData.idToken,
                           +resData.expiresIn);
                }));
                //here expiresIn is an number so tht we have to add " + " before..

    }

    private handleAuthentication(email: string, 
        userId: string,
         token: string, 
         expiresIn: number)
    {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
       // this.autoLogout(expiresIn * 1000 );
        localStorage.setItem('userData', JSON.stringify(user));

    }
    autoLogin()
    {
       const userData: {
           email: string;
           id: string;
           _token: string;
           _tokenExpirationDate: string;

       } = JSON.parse(localStorage.getItem('userData'))

       if(!userData)
       {
           return;  
       }

       const loadedUser = new User(userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate));

        if(loadedUser.token)
        {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - 
            new Date().getTime();
           // this.autoLogout(expirationDuration);
        }
    }

    login(email: string, password: string)
    {
       return  this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC02fWbKlQEIBlpi6l3R9bA9UUyHpCssj4',   
        { 
            email: email,
            password: password,
            returnSecureToken:  true

        }
        )
        .pipe(catchError(this.handleError),
        tap(resData => {
            this.handleAuthentication(resData.email,
                 resData.localId,
                  resData.idToken,
                   +resData.expiresIn);
        })) 
    }


    logout()
    {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');

        if(this.tokenExpirationTimer)
        {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

   /* autoLogout(expirationDuration: number)
    {
       console.log(expirationDuration);
       
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();

        }, 90000);
    }*/


    private handleError(errorRes: HttpErrorResponse)
    {
        let errorMessage = 'An unknown error occured';
                if(!errorRes.error || !errorRes.error.error)
                    {
                        return throwError(errorMessage);
                    }
                switch(errorRes.error.error.message)
                {
                    case 'EMAIL-EXISTS':
                        errorMessage = 'This email exists already';
                        break;
                    case 'EMAIL_NOT_FOUND':
                        errorMessage = 'This emial does not exist'
                        break;
                    case 'INVALID_PASSWORD':
                        errorMessage = 'This password is not correct'
                        break;

                }
                return throwError(errorMessage);
    }
}

/*
1.signup method send an http request to an backeend
2.this path copied as api path from firebase authentication for signup email,
insde that 
there is an email,
password and returnSecureToken <--- this elements from an firabseb  doucmentation..for authentcation they need a same name.

projec setting mdhe web api key post methodmde tkleleya key cha pudhe paste krychi.
*/