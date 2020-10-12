import { Component, OnInit } from '@angular/core';
import { Contact } from '../../models/contact';
import { ContactService } from '../../services/contact.service';
import { Global } from '../../services/global';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ContactService]
  
})
export class ContactComponent implements OnInit {
  public titleC:string;
  public contact:Contact;
  public status: string;
  public save_contact;

  constructor(
		private _contactService: ContactService,

  ) {
    this.titleC="Contact"
    this.contact = new Contact('','','','')
   }

  ngOnInit(): void {
  }

   onSubmit(form){
    //console.log(this.user);
    //form.reset();
    this._contactService.saveContact(this.contact).subscribe(
			response => {
				if(response.contact){
			
		
					
				}else{
					this.status = 'failed';
				}
			},
			error => {
				console.log(<any>error);
      },
      form.reset()
		);
	}
     
    }

