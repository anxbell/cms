import { Component, Input } from '@angular/core'; //declare input
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-detail',
  standalone: false,
  templateUrl: './contact-detail.component.html',
})
export class ContactDetailComponent {
  @Input() contact!: Contact;
  // contact: Contact = new Contact(
  //   1,
  //   'R. Kent Jackson',
  //   'jacksonk@byui.edu',
  //   '208-496-3771',
  //   'assets/images/jacksonk.jpg',
  //   null
  // ); Removed and added input to receive the selected contact.
}
