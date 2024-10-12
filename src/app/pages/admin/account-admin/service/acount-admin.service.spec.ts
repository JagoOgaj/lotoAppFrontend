import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AcountAdminService } from './acount-admin.service';
import {
  AdminInfoResponse,
  AdminLogoutResponse,
} from '../../../../constants/ressources/admin/AdminInfoRessource';
import { ApiAdmin } from '../../../../config/api-admin';

describe('AcountAdminService', () => {
  let service: AcountAdminService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AcountAdminService],
    });
    service = TestBed.inject(AcountAdminService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAdminInfo', () => {
    it('should return admin info on success', () => {
      const mockResponse: AdminInfoResponse = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
      };

      service.getAdminInfo().subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(
        `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.ACCOUNT_INFO}`,
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should handle errors', () => {
      const errorMessage = 'Erreur de récupération des informations';

      service.getAdminInfo().subscribe({
        next: () => fail('should have failed with the 500 error'),
        error: (error) => {
          expect(error.errors).toBeTruthy();
          expect(error.message).toBe(errorMessage);
        },
      });

      const req = httpMock.expectOne(
        `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.ACCOUNT_INFO}`,
      );
      expect(req.request.method).toBe('GET');
      req.flush(
        { message: errorMessage },
        { status: 500, statusText: 'Server Error' },
      );
    });
  });

  describe('logout', () => {
    it('should return a logout response on success', () => {
      const mockResponse: AdminLogoutResponse = {
        message: 'Déconnexion réussie',
      };

      service.logout().subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(
        `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.LOGOUT}`,
      );
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });

    it('should handle logout errors', () => {
      const errorMessage = 'Erreur de déconnexion';

      service.logout().subscribe({
        next: () => fail('should have failed with the logout error'),
        error: (error) => {
          expect(error.errors).toBeTruthy();
          expect(error.message).toBe(errorMessage);
        },
      });

      const req = httpMock.expectOne(
        `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.LOGOUT}`,
      );
      expect(req.request.method).toBe('POST');
      req.flush(
        { message: errorMessage },
        { status: 500, statusText: 'Server Error' },
      );
    });
  });
});
