import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContactFormService } from './service/contact-form.service';
import { ContactUsRessource } from '../../constants/ressources/contact/ContactUsRessource';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
})
export class ContactFormComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactFormService,
    private route: Router,
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const curentValue = this.contactForm.value;
      const data: ContactUsRessource = {
        email: curentValue.email,
        message: curentValue.message,
      };
      this.contactService.sendMessgage(data).subscribe({
        next: (response) => {
          this.route.navigate(['/home']);
        },
        error: (err) => {
          this.contactForm.reset();
        },
      });
    }
  }

  // Méthode pour vérifier les erreurs de validation
  get emailError(): string {
    const emailControl = this.contactForm.get('email');
    if (emailControl?.hasError('required')) {
      return "L'email est requis";
    }
    if (emailControl?.hasError('email')) {
      return 'Veuillez entrer un email valide (ex: textnombre@textnombre.text)';
    }
    return '';
  }

  get messageError(): string {
    const messageControl = this.contactForm.get('message');
    if (messageControl?.hasError('required')) {
      return 'Le message est requis';
    }
    return '';
  }
}
