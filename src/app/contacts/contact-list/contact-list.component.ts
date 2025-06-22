import { Component, OnDestroy, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  subscription: Subscription;
  term: string = '';

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.getContacts();
    
    this.contactService.contactChangedEvent.subscribe((contactsList: Contact[]) => {
      this.contacts = contactsList;
    });
  }

  onSelected(contact: Contact) {
  this.contactService.contactSelectedEvent.next(contact);
  }

    ngOnDestroy() {
      if(this.subscription) {
    this.subscription.unsubscribe();
    }
  }

  search(value: string) {
    this.term = value;
  }

}

