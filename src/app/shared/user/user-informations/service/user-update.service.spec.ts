import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UserUpdateService } from './user-update.service';
import {
  UpdateInfoUser,
  UpdateInfoUserResponse,
  UpdateInfoUserResponseError,
} from '../../../../constants/ressources/user/userInfoRessource';
import { ApiUser } from '../../../../config/api-user';

describe('UserUpdateService', () => {
  let service: UserUpdateService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserUpdateService],
    });

    service = TestBed.inject(UserUpdateService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should update user information successfully', () => {
    const mockData: UpdateInfoUser = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
    };

    const mockResponse: UpdateInfoUserResponse = {
      message: 'Utilisateur mis à jour avec succès',
    };

    service.updateInfo(mockData).subscribe((response) => {
      expect(response.message).toBe('Utilisateur mis à jour avec succès');
    });

    const req = httpMock.expectOne(
      `${ApiUser.BASE_URL}${ApiUser.ENDPOINT.UPDATE_INFO}`,
    );
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse);
  });

  it('should handle error when updating user information', () => {
    const mockData: UpdateInfoUser = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
    };

    const mockErrorResponse = {
      message: "Erreur lors de la mise à jour de l'utilisateur",
      details: {
        first_name: ['Ce champ est requis'],
        last_name: null,
        email: null,
        password: null,
      },
    };

    service.updateInfo(mockData).subscribe({
      next: () => fail('should have failed with the 404 error'),
      error: (error: UpdateInfoUserResponseError) => {
        expect(error.errors).toBe(true);
        expect(error.message).toBe(
          "Erreur lors de la mise à jour de l'utilisateur",
        );
        expect(error.details?.first_name).toEqual(['Ce champ est requis']);
      },
    });

    const req = httpMock.expectOne(
      `${ApiUser.BASE_URL}${ApiUser.ENDPOINT.UPDATE_INFO}`,
    );
    expect(req.request.method).toBe('PUT');
    req.flush(mockErrorResponse, { status: 400, statusText: 'Bad Request' });
  });
});
