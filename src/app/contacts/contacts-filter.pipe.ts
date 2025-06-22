import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter',
  standalone: false
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term: string): Contact[] {
    
    if (!contacts || !term || term.length < 1) return contacts;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(term.toLowerCase())
    );
  }
}
