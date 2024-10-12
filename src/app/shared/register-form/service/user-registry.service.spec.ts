import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UserRegistryService } from './user-registry.service';
import {
  RegistryData,
  RegistryErrors,
  RegistryResponce,
} from '../../../constants/ressources/user/registryUserRessource';
import { ApiUser } from '../../../config/api-user';

describe('UserRegistryService', () => {
  let service: UserRegistryService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserRegistryService],
    });

    service = TestBed.inject(UserRegistryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('devrait enregistrer un nouvel utilisateur et retourner une réponse', () => {
    const mockData: RegistryData = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    };

    const mockResponse: RegistryResponce = {
      message: 'Utilisateur créé avec succès.',
      access_token: 'acess',
      refresh_token: 'refresh',
    };

    service.registry(mockData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(
      `${ApiUser.BASE_URL}${ApiUser.ENDPOINT.REGISTER}`,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it("devrait gérer les erreurs lors de l'enregistrement", () => {
    const mockData: RegistryData = {
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'jane.doe@example.com',
      password: 'password123',
    };

    const mockError: RegistryErrors = {
      errors: true,
      message: "Erreur de création de l'utilisateur",
      details: {
        first_name: [''],
        last_name: [''],
        email: ['Email déjà utilisé'],
        password: [''],
      },
    };

    service.registry(mockData).subscribe(
      () => fail('attendu une erreur, mais a reçu une réponse'),
      (error: RegistryErrors) => {
        expect(error).toEqual(mockError);
      },
    );

    const req = httpTestingController.expectOne(
      `${ApiUser.BASE_URL}${ApiUser.ENDPOINT.REGISTER}`,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockError, { status: 400, statusText: 'Bad Request' });
  });
});
