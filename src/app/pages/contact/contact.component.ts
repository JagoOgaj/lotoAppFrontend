import { Component } from '@angular/core';
import { NavbarSharedComponent } from "../../shared/navbar-shared/navbar-shared.component";
import { FooterSharedComponent } from "../../shared/footer-shared/footer-shared.component";
import { ContactFormComponent } from "../../shared/contact-form/contact-form.component";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [NavbarSharedComponent, FooterSharedComponent, ContactFormComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  pageState: string = "contact";
}
