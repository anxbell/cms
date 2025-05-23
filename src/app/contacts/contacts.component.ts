import { Component } from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';


@Component({
  selector: 'app-contacts',
  standalone: false,
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
})


export class ContactsComponent {
  selectedContact!: Contact; //property to hold the currently selected contact.
  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService.contactSelectedEvent
      .subscribe((contact: Contact) => {
        this.selectedContact = contact;
      });
  }


}
