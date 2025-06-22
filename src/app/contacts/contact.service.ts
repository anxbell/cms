import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new Subject<Contact>();
  contactChangedEvent = new Subject<Contact[]>();
  maxContactId: number
  contacts: Contact[] = [];
  url: string = 'https://the-cms-project-default-rtdb.firebaseio.com/contacts.json'

  constructor(private http: HttpClient) {
    // this.contacts = MOCKCONTACTS;
    this.getContacts();
    this.maxContactId = this.getMaxId();
  }

  getContacts() {
    this.http
      .get<Contact[]>(this.url).subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts ?? [];
          this.maxContactId = this.getMaxId();
          this.contacts.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          });
          this.contactChangedEvent.next(this.contacts.slice());
        },
        (error) => {
          console.error(error);
        }
      );
  }

  getContact(id: string): Contact {
    for (let contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  deleteContact(contact: Contact) {
    if (!contact) return;
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) return;
    this.contacts.splice(pos, 1);
    this.storeContacts();
    // const contactsListClone = this.contacts.slice();
    // this.contactChangedEvent.next(contactsListClone);
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.storeContacts();
    // const contactsListClone = this.contacts.slice();
    // this.contactChangedEvent.next(contactsListClone);
  }

  updateContact(originalContact: Contact, newContact: Contact) {
  if (!originalContact || !newContact) {
    return;
  }

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.storeContacts();
    // const contactsListClone = this.contacts.slice();
    // this.contactChangedEvent.next(contactsListClone);
  }

  storeContacts() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put(this.url, JSON.stringify(this.contacts), { headers }).subscribe(() => {
      this.contactChangedEvent.next(this.contacts.slice());
    });
  }

    getMaxId(): number {
    let maxId = 0;
    for (let contact of this.contacts) {
      const currentId = parseInt(contact.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

}
 