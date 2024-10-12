import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ContactFormService } from './contact-form.service';
import {
  ContactUsErrors,
  ContactUsResponse,
  ContactUsRessource,
} from '../../../constants/ressources/contact/ContactUsRessource';
import { ApiContact } from '../../../config/api-contact';

describe('ContactFormService', () => {
  let service: ContactFormService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContactFormService],
    });
    service = TestBed.inject(ContactFormService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('devrait envoyer un message et retourner une réponse', () => {
    const mockData: ContactUsRessource = {
      email: 'john.doe@example.com',
      message: 'Ceci est un message de test.',
    };

    const mockResponse: ContactUsResponse = {
      message: 'Message envoyé avec succès.',
    };

    service.sendMessgage(mockData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${ApiContact.BASE_URL}${ApiContact.ENDPOINT.CONTACT_US}`,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it("devrait gérer les erreurs lors de l'envoi du message", () => {
    const mockData: ContactUsRessource = {
      email: 'john.doe@example.com',
      message: 'Ceci est un message de test.',
    };

    const mockErrorResponse = {
      error: {
        message: 'Erreur de validation',
        erros: ["L'email est invalide."],
        details: 'Le champ email doit être un email valide.',
      },
    };

    service.sendMessgage(mockData).subscribe({
      next: () => fail('On ne devrait pas arriver ici!'),
      error: (error: ContactUsErrors) => {
        expect(error.message).toBe('Erreur de validation');
        expect(error.errors).toEqual(true);
        expect(error.details).toBe('Le champ email doit être un email valide.');
      },
    });

    const req = httpMock.expectOne(
      `${ApiContact.BASE_URL}${ApiContact.ENDPOINT.CONTACT_US}`,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockErrorResponse, { status: 400, statusText: 'Bad Request' });
  });
});
