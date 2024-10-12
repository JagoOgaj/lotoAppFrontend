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

/**
 * Composant pour afficher et gérer le formulaire de contact.
 *
 * @component
 */
@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
})
export class ContactFormComponent implements OnInit {
  contactForm!: FormGroup;

  /**
   * Constructeur du composant.
   *
   * @param {FormBuilder} fb - Le constructeur de formulaires réactifs.
   * @param {ContactFormService} contactService - Service pour envoyer les messages.
   * @param {Router} route - Service de navigation pour rediriger après l'envoi.
   */
  constructor(
    private fb: FormBuilder,
    private contactService: ContactFormService,
    private route: Router,
  ) {}

  /**
   * Méthode appelée lors de l'initialisation du composant.
   * Elle initialise le formulaire de contact.
   */
  ngOnInit(): void {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  /**
   * Méthode appelée lors de la soumission du formulaire.
   * Elle envoie les données du formulaire si elles sont valides.
   */
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

  /**
   * Méthode pour obtenir l'erreur de validation de l'email.
   *
   * @returns {string} - Un message d'erreur si l'email est invalide, sinon une chaîne vide.
   */
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

  /**
   * Méthode pour obtenir l'erreur de validation du message.
   *
   * @returns {string} - Un message d'erreur si le message est vide, sinon une chaîne vide.
   */
  get messageError(): string {
    const messageControl = this.contactForm.get('message');
    if (messageControl?.hasError('required')) {
      return 'Le message est requis';
    }
    return '';
  }
}
