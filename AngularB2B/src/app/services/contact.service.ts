import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';
import { Global } from './global';


@Injectable ()
export class ContactService{
    public url:string;

    constructor(
		private _http: HttpClient
	){
		this.url = Global.url;
	}

	testService(){
		return 'Probando el servicio de Angular';
	}

	saveContact(contact: Contact): Observable<any>{
		let params = JSON.stringify(contact);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.post(this.url+'save-contact', params, {headers: headers});
	}

	getContact(): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'contacts', {headers: headers});
	}

	getContacts(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'contact/'+id, {headers: headers});
	}

	deleteContact(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.delete(this.url+'contact/'+id, {headers: headers});
	}

	/*updateProject(project): Observable<any>{
		let params = JSON.stringify(project);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.put(this.url+'contact/'+project._id, params, {headers: headers});
	}
*/
}