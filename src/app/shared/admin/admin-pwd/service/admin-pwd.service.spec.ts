import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AdminPwdService } from './admin-pwd.service';
import {
  UpdateInfoAdminResponse,
  UpdatePasswordAdmin,
  UpdatePasswordUAdminError,
} from '../../../../constants/ressources/admin/AdminUpdateInfoRessource';
import { ApiAdmin } from '../../../../config/api-admin';

describe('AdminPwdService', () => {
  let service: AdminPwdService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdminPwdService],
    });

    service = TestBed.inject(AdminPwdService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update password admin successfully', () => {
    const mockResponse: UpdateInfoAdminResponse = {
      message: 'Mot de passe mis à jour avec succès',
    };
    const mockData: UpdatePasswordAdmin = {
      old_password: 'old_password',
      new_password: 'new_password',
    };

    service.updatePasswordAdmin(mockData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.UPDATE_PASSWORD}`,
    );
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse);
  });

  it('should handle error when updating password admin', () => {
    const mockData: UpdatePasswordAdmin = {
      old_password: 'old_password',
      new_password: 'new_password',
    };

    const mockErrorResponse = {
      error: {
        message: 'Erreur de mise à jour',
        details: {
          password: ['Mot de passe invalide'],
          new_password: ['Nouveau mot de passe requis'],
        },
      },
    };

    service.updatePasswordAdmin(mockData).subscribe({
      next: () => fail('should have failed with the 400 error'),
      error: (error: UpdatePasswordUAdminError) => {
        expect(error.errors).toBe(true);
        expect(error.message).toBe('Erreur de mise à jour');
        expect(error.details?.password).toEqual(['Mot de passe invalide']);
        expect(error.details?.new_password).toEqual([
          'Nouveau mot de passe requis',
        ]);
      },
    });

    const req = httpMock.expectOne(
      `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.UPDATE_PASSWORD}`,
    );
    expect(req.request.method).toBe('PUT');
    req.flush(mockErrorResponse, { status: 400, statusText: 'Bad Request' });
  });
});
