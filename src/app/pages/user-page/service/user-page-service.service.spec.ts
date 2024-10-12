import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UserPageServiceService } from './user-page-service.service';
import { UserInfoRessource } from '../../../constants/ressources/user/userInfoRessource';
import { ApiUser } from '../../../config/api-user';
import { LogoutUserResponse } from '../../../constants/ressources/user/LogoutUserRessource';
describe('UserPageServiceService', () => {
  let service: UserPageServiceService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserPageServiceService],
    });
    service = TestBed.inject(UserPageServiceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUserInfo', () => {
    it('should return user info on success', () => {
      const mockUserInfo: UserInfoRessource = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        notification: true,
      };

      service.getUserInfo().subscribe((data) => {
        expect(data).toEqual(mockUserInfo);
      });

      const req = httpTestingController.expectOne(
        `${ApiUser.BASE_URL}${ApiUser.ENDPOINT.ACCOUNT_INFO}`,
      );
      expect(req.request.method).toEqual('GET');
      req.flush(mockUserInfo);
    });

    it('should handle error on failure', () => {
      const mockError = { message: 'Erreur de récupération', details: {} };

      service.getUserInfo().subscribe({
        next: () => {},
        error: (error) => {
          expect(error.errors).toBeTruthy();
          expect(error.message).toEqual(mockError.message);
        },
      });

      const req = httpTestingController.expectOne(
        `${ApiUser.BASE_URL}${ApiUser.ENDPOINT.ACCOUNT_INFO}`,
      );
      expect(req.request.method).toEqual('GET');
      req.flush(mockError, { status: 500, statusText: 'Server Error' });
    });
  });

  describe('logoutUser', () => {
    it('should log out user successfully', () => {
      const mockLogoutResponse: LogoutUserResponse = {
        message: 'Déconnexion réussie',
      };

      service.logoutUser().subscribe((response: any) => {
        expect(response).toEqual(mockLogoutResponse);
      });

      const req = httpTestingController.expectOne(
        `${ApiUser.BASE_URL}${ApiUser.ENDPOINT.LOGOUT}`,
      );
      expect(req.request.method).toEqual('POST');
      req.flush(mockLogoutResponse);
    });

    it('should handle error on logout failure', () => {
      const mockError = { message: 'Erreur de déconnexion', details: {} };

      service.logoutUser().subscribe({
        next: () => {},
        error: (error: { errors: any; message: any }) => {
          expect(error.errors).toBeTruthy();
          expect(error.message).toEqual(mockError.message);
        },
      });

      const req = httpTestingController.expectOne(
        `${ApiUser.BASE_URL}${ApiUser.ENDPOINT.LOGOUT}`,
      );
      expect(req.request.method).toEqual('POST');
      req.flush(mockError, { status: 500, statusText: 'Server Error' });
    });
  });
});
