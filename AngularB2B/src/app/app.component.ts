import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import {Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AuthService]
})
export class AppComponent   { 
  title = 'AngularB2B';
  public isLogged=false;

  public user$:Observable<any> = this.authSvc.AfAuth.user;
  

  constructor( private authSvc:AuthService, private router:Router) {}

    async onLogout(){
      try{
       await this.authSvc.logout();
       this.router.navigate(['/home']);
      } catch(error) {
        console.log(error);
      }   
    }  
  }



