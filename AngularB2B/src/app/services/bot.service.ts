import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bot } from '../models/bot';
import { Global } from './global';


@Injectable ()
export class BotService{
    public url:string;

    constructor(
        private _http: HttpClient
    ){
        this.url =  Global.url;
    }

    testService (){
        return'probando el servicio de Angular';
    }

    saveBot(bot: Bot):Observable<any> {
        let params=JSON.stringify(bot);
        let headers=new HttpHeaders().set('Content-type', 'application/json');


        return this._http.post(this.url+'save-bot', params, {headers:headers});
    }

    getBots(): Observable<any> {
        let headers=new HttpHeaders().set('Content-type', 'application/json');

        return this._http.get(this.url+'bots', {headers:headers});
    }

}


