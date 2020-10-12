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
export class AppComponent  implements OnInit { 
  title = 'AngularB2B';
  public isLogged=false;
  public user$:Observable<any> = this.authSvc.AfAuth.user;
  public user :any;

  constructor( private authSvc:AuthService, private router:Router) {}
    async ngOnInit(){
     console.log('Navbar');
      this.user =await this.authSvc.getCurrentUser();
      if (this.user){
        this.isLogged=true;
         console.log('user->', this.user);
         this.router.navigate(['/home'])
      }
    }
    async onLogout(){

      try{
       await this.authSvc.logout();
       this.router.navigate(['/home']);
      } catch(error) {
        console.log(error);
      }
      
    }  
    
 
   }



