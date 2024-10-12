import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UserLoginService } from './user-login.service';
import { ApiUser } from '../../../config/api-user';
import {
  LoginData,
  LoginResponse,
  LoginErrors,
} from '../../../constants/ressources/user/LoginUserRessource';

describe('UserLoginService', () => {
  let service: UserLoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserLoginService],
    });
    service = TestBed.inject(UserLoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in the user and return response', () => {
    const mockLoginData: LoginData = {
      email: 'test@example.com',
      password: 'password123',
    };
    const mockLoginResponse: LoginResponse = {
      message: '',
      access_token: 'acess',
      refresh_token: 'refresh',
    };

    service.login(mockLoginData).subscribe((response) => {
      expect(response).toEqual(mockLoginResponse);
    });

    const req = httpMock.expectOne(
      `${ApiUser.BASE_URL}${ApiUser.ENDPOINT.LOGIN}`,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockLoginResponse);
  });

  it('should handle login error', () => {
    const mockLoginData: LoginData = {
      email: 'test@example.com',
      password: 'password123',
    };

    service.login(mockLoginData).subscribe({
      next: () => fail('expected an error, not a response'),
      error: (error: LoginErrors) => {
        expect(error).toBeTruthy();
        expect(error.message).toBe('Erreur de connexion');
      },
    });

    const req = httpMock.expectOne(
      `${ApiUser.BASE_URL}${ApiUser.ENDPOINT.LOGIN}`,
    );
    req.flush(
      { message: 'Erreur de connexion', details: { email: ['Invalid email'] } },
      { status: 400, statusText: 'Bad Request' },
    );
  });
});
