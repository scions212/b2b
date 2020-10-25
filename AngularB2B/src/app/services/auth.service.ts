import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';


@Injectable()
export class AuthService {


  constructor( public AfAuth: AngularFireAuth) { }


async singin(email:string,password:any){
  try {const result = await this.AfAuth.signInWithEmailAndPassword(email,password);
    return result;
  }
  catch(error){
    console.log(error)
  };
}


async singup(email:string,password:any){
  try{ 
    const result = await this.AfAuth.createUserWithEmailAndPassword(email,password);
    return result;
  }
  catch (error){
    console.log(error);
  }
}

  async logout(){
    try{
      await this.AfAuth.signOut();
    }
    catch(error){
      console.log(error)
    }
  }
}