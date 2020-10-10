import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
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
  constructor( private authSvc:AuthService) { }

  ngOnInit(): void {
  }
  
  onSingin(){
    const{ email,password}=this.singinForm.value;
    this.authSvc.singup(email,password);
    }
};
