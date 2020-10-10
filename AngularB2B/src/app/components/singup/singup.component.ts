import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

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
  constructor( private authSvc:AuthService) { }

  ngOnInit(): void {
  }

  onSingup(){
    const{ email,password}=this.singupForm.value;
    this.authSvc.singup(email,password);
    //form.reset();
  }
  
}
