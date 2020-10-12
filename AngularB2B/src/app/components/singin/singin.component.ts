import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.css'],
  providers:[AuthService]

})
export class SinginComponent implements OnInit {
  singinForm = new FormGroup({
  email:new FormControl(''),
  password: new FormControl(''),
});
  constructor( private authSvc:AuthService, private router:Router) { }

  ngOnInit(): void {}
  
  async onSingin(){
    const{ password,email}=this.singinForm.value;
    try{
     const user= await this.authSvc.singin(email,password);
     if (user){
       this.router.navigate(['/home'])
     }
    }
    catch(error){
      console.log(error)}
    }
};
