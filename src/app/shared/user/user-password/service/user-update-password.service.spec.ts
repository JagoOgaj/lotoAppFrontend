import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UserUpdatePasswordService } from './user-update-password.service';
import {
  UpdateInfoUserResponse,
  UpdatePasswordUser,
  UpdatePasswordUserError,
} from '../../../../constants/ressources/user/userInfoRessource';
import { ApiUser } from '../../../../config/api-user';

describe('UserUpdatePasswordService', () => {
  let service: UserUpdatePasswordService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserUpdatePasswordService],
    });

    service = TestBed.inject(UserUpdatePasswordService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update password successfully', () => {
    const updatePasswordData: UpdatePasswordUser = {
      old_password: 'oldPassword',
      new_password: 'newPassword',
    };

    const mockResponse: UpdateInfoUserResponse = {
      message: 'Mot de passe mis à jour avec succès',
    };

    service.updatePassword(updatePasswordData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${ApiUser.BASE_URL}${ApiUser.ENDPOINT.UPDATE_PASSWORD}`,
    );
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse);
  });

  it('should handle error on update password', () => {
    const updatePasswordData: UpdatePasswordUser = {
      old_password: 'oldPassword',
      new_password: 'newPassword',
    };

    const mockErrorResponse = {
      errors: true,
      message: 'Erreur de mise à jour du mot de passe',
      details: {
        password: 'Mot de passe incorrect',
        new_password: null,
      },
    };

    service.updatePassword(updatePasswordData).subscribe({
      next: () => fail('should have failed with the 500 error'),
      error: (error: UpdatePasswordUserError) => {
        expect(error).toEqual({ message: '', errors: true });
      },
    });

    const req = httpMock.expectOne(
      `${ApiUser.BASE_URL}${ApiUser.ENDPOINT.UPDATE_PASSWORD}`,
    );
    expect(req.request.method).toBe('PUT');
    req.flush(mockErrorResponse, { status: 500, statusText: 'Server Error' });
  });
});
