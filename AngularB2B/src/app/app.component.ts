import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AuthService]
})
export class AppComponent  implements OnInit { 
  title = 'AngularB2B';
  public isLogged=true;
  public user :any;
  
  constructor( private authSvc:AuthService) {}
    async ngOnInit(){
      console.log('Navbar');
      this.user =await this.authSvc.getCurrentUser();
      if (this.user){
        this.isLogged=false;
        //console.log('user->', user);
      }
    }
    onLogout(){
      this.authSvc.logout();
    }
   }


