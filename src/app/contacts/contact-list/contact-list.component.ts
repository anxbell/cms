import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';


@Component({
  selector: 'cms-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    
    this.contactService.contactChangedEvent.subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
    });
  }

  onSelected(contact: Contact) {
  this.contactService.contactSelectedEvent.emit(contact);
  }

}

// export class ContactListComponent {
//   contacts: Contact[] = [
//     new Contact(
//       '1',
//       'R. Kent Jackson',
//       'jacksonk@byui.edu',
//       '208-496-3771',
//       '../../assets/images/jacksonk.jpg',
//       null
//     ),
//     new Contact(
//       '1',
//       'Rex Barzee',
//       'barzeer@byui.edu',
//       '208-496-3768',
//       '../../assets/images/barzeer.jpg',
//       null
//     )
//   ];

//   @Output() selectedContactEvent = new EventEmitter<Contact>();

//   onSelected(contact: Contact) {
//     this.selectedContactEvent.emit(contact);
//   }

// }
