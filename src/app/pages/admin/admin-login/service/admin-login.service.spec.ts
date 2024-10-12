import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AdminLoginService } from './admin-login.service';
import {
  LoginAdminData,
  LoginAdminResponse,
  LoginAdminErrors,
} from '../../../../constants/ressources/admin/AdminLoginRessource';
import { ApiAdmin } from '../../../../config/api-admin';

describe('AdminLoginService', () => {
  let service: AdminLoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdminLoginService],
    });
    service = TestBed.inject(AdminLoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should authenticate admin successfully', () => {
    const mockAdminData: LoginAdminData = {
      email: 'admin@example.com',
      password: 'password123',
    };

    const mockResponse: LoginAdminResponse = {
      message: 'Connexion réussie',
      access_token: 'mockToken123',
      refresh_token: 'mockRefreshToken123',
    };

    service.loginAdmin(mockAdminData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.LOGIN}`,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should handle error on login', () => {
    const mockAdminData: LoginAdminData = {
      email: 'admin@example.com',
      password: 'wrongPassword',
    };

    const mockErrorResponse = {
      message: 'Invalid credentials',
      details: {
        email: ['Email is incorrect'],
        password: ['Password is incorrect'],
      },
    };

    service.loginAdmin(mockAdminData).subscribe({
      next: () => fail('should have failed with the 400 error'),
      error: (error: LoginAdminErrors) => {
        expect(error.errors).toBe(true);
        expect(error.message).toBe('Invalid credentials');
        expect(error.details?.emailError).toBe('Email is incorrect');
        expect(error.details?.passwordError).toBe('Password is incorrect');
      },
    });

    const req = httpMock.expectOne(
      `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.LOGIN}`,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockErrorResponse, { status: 400, statusText: 'Bad Request' });
  });
});
