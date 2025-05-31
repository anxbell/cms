import { Component, Input } from '@angular/core'; //declare input
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

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

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      this.contact = this.contactService.getContact(id);
    });
  }

  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigateByUrl('/contacts');
  }

}
