import { first } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {auth} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from 'firebase';

@Injectable()
export class AuthService {
  public user:User;

  constructor( public AfAuth: AngularFireAuth) { }


async singin(email:string,password:any){
  try {const result = await this.AfAuth.signInWithEmailAndPassword(email,password);
    return result;
  }
  catch(error){
    console.log(error)
  };
}


async singup(email:string,password:any,/*name:string,lastname:string,rpassword:any*/){
  try{ 
    const result = await this.AfAuth.createUserWithEmailAndPassword(email,password/*,name,lastname,rpassword*/);
    return result;
  }
  catch (error){
    console.log(error);
  }
}

async logout(){
  try{await this.AfAuth.signOut();
  }
  catch(error){
    console.log(error)
  }
}

getCurrentUser(){
  return this.AfAuth.authState.pipe(first()).toPromise();
  }
}
