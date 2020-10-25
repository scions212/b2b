import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css'],
  providers:[AuthService]
})
export class SingupComponent implements OnInit {
  singupForm = new FormGroup({
  name:new FormControl(''),
  lastname :new FormControl(''),
  email:new FormControl(''),
  password: new FormControl(''),
  rpassword:new FormControl(''),
});
  constructor( private authSvc:AuthService,  private router:Router) { }
  
  ngOnInit(): void {
  }
  async onSingup(){
    const{email,password}=this.singupForm.value;
    try{
      const user= await this.authSvc.singup(email,password);
      if (user){
        this.router.navigate(['/singin'])
        alert("Usuario Guardado con exito");
        }
      }
        catch(error){
          console.log(error)}
        }         
};

 