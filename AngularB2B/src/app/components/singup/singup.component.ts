import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {
  singupForm = new FormGroup({
  email:new FormControl(''),
  password: new FormControl(''),
});
  constructor() { }

  ngOnInit(): void {
  }

  onSingup(){
    console.log ('form' ,this.singupForm.value)
  };

}
