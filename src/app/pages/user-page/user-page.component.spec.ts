import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserPageComponent } from './user-page.component';
import { UserPageServiceService } from './service/user-page-service.service';
import { AuthService } from '../../core/service/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { UserInfoRessource } from '../../constants/ressources/user/userInfoRessource';

describe('UserPageComponent', () => {
  let component: UserPageComponent;
  let fixture: ComponentFixture<UserPageComponent>;

  let userServiceMock: {
    getUserInfo: jest.Mock;
    logoutUser: jest.Mock;
  };

  let authServiceMock: {
    logout: jest.Mock;
    clearTokens: jest.Mock;
  };

  let routerMock: {
    navigate: jest.Mock;
  };

  beforeEach(() => {
    userServiceMock = {
      getUserInfo: jest.fn(),
      logoutUser: jest.fn(),
    };

    authServiceMock = {
      logout: jest.fn().mockReturnValue(of(null)),
      clearTokens: jest.fn(),
    };

    routerMock = {
      navigate: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [UserPageComponent],
      providers: [
        { provide: UserPageServiceService, useValue: userServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserPageComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('loadUserInfo', () => {
    it('should load user info successfully', () => {
      const mockUserInfo: UserInfoRessource = {
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'jane.doe@example.com',
        notification: true,
      };

      userServiceMock.getUserInfo.mockReturnValue(of(mockUserInfo));

      component.loadUserInfo();

      expect(userServiceMock.getUserInfo).toHaveBeenCalled();
      expect(component.userInfo).toEqual(mockUserInfo);
    });

    it('should handle error when loading user info', () => {
      userServiceMock.getUserInfo.mockReturnValue(
        throwError(() => new Error('Error loading user info')),
      );

      component.loadUserInfo();

      expect(userServiceMock.getUserInfo).toHaveBeenCalled();

      expect(component.userInfo).toEqual({} as UserInfoRessource);
    });
  });

  describe('logout', () => {
    it('should log out user and navigate to home', () => {
      userServiceMock.logoutUser.mockReturnValue(of(null));

      component.logout();

      expect(userServiceMock.logoutUser).toHaveBeenCalled();
      expect(authServiceMock.logout).toHaveBeenCalled();
      expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
    });

    it('should handle error during logout', () => {
      userServiceMock.logoutUser.mockReturnValue(
        throwError(() => new Error('Logout error')),
      );

      component.logout();

      expect(userServiceMock.logoutUser).toHaveBeenCalled();
      expect(authServiceMock.clearTokens).toHaveBeenCalled();
      expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
    });
  });

  describe('getFullNameUser', () => {
    it('should return full name of user', () => {
      component.userInfo = {
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'jane.doe@example.com',
        notification: true,
      } as UserInfoRessource;

      const fullName = component.getFullNameUser();

      expect(fullName).toEqual('Jane Doe');
    });
  });
});
