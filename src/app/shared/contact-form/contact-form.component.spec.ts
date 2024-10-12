import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactFormComponent } from './contact-form.component';
import { ContactFormService } from './service/contact-form.service';
import { of, throwError } from 'rxjs';

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;
  let contactService: ContactFormService;
  let router: Router;

  beforeEach(() => {
    const contactServiceMock = {
      sendMessgage: jest.fn(),
    };

    const routerMock = {
      navigate: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ContactFormComponent],
      providers: [
        { provide: ContactFormService, useValue: contactServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    contactService = TestBed.inject(ContactFormService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('devrait initialiser le formulaire', () => {
    component.ngOnInit();
    expect(component.contactForm).toBeDefined();
    expect(component.contactForm.controls['email']).toBeDefined();
    expect(component.contactForm.controls['message']).toBeDefined();
  });

  it("devrait soumettre le formulaire et naviguer vers la page d'accueil", () => {
    component.contactForm.setValue({
      email: 'test@example.com',
      message: 'Ceci est un message.',
    });
    contactService.sendMessgage = jest.fn().mockReturnValue(of({}));

    component.onSubmit();

    expect(contactService.sendMessgage).toHaveBeenCalledWith({
      email: 'test@example.com',
      message: 'Ceci est un message.',
    });
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it("devrait réinitialiser le formulaire en cas d'erreur", () => {
    component.contactForm.setValue({
      email: 'test@example.com',
      message: 'Ceci est un message.',
    });
    contactService.sendMessgage = jest
      .fn()
      .mockReturnValue(throwError(() => new Error('Erreur')));

    component.onSubmit();

    expect(component.contactForm.value).toEqual({ email: null, message: null });
  });

  it("devrait afficher un message d'erreur si l'email est requis", () => {
    component.contactForm.get('email')!.setValue('');
    expect(component.emailError).toBe("L'email est requis");
  });

  it("devrait afficher un message d'erreur si l'email est invalide", () => {
    component.contactForm.get('email')!.setValue('invalid-email');
    expect(component.emailError).toBe(
      'Veuillez entrer un email valide (ex: textnombre@textnombre.text)',
    );
  });

  it("devrait afficher un message d'erreur si le message est requis", () => {
    component.contactForm.get('message')!.setValue('');
    expect(component.messageError).toBe('Le message est requis');
  });
});
