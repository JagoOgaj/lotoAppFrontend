import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AccountAdminComponent } from './account-admin.component';
import { AcountAdminService } from './service/acount-admin.service';
import { AuthService } from '../../../core/service/auth.service';
import { AdminInfoResponse } from '../../../constants/ressources/admin/AdminInfoRessource';

describe('AccountAdminComponent', () => {
  let component: AccountAdminComponent;
  let fixture: ComponentFixture<AccountAdminComponent>;
  let mockAdminAccountService: jest.Mocked<AcountAdminService>;
  let mockAuthService: jest.Mocked<AuthService>;

  beforeEach(async () => {
    mockAdminAccountService = {
      getAdminInfo: jest.fn(),
    } as unknown as jest.Mocked<AcountAdminService>;

    mockAuthService = {
      isAuthenticated: jest.fn(),
    } as unknown as jest.Mocked<AuthService>;

    await TestBed.configureTestingModule({
      imports: [AccountAdminComponent],
      providers: [
        { provide: AcountAdminService, useValue: mockAdminAccountService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountAdminComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load admin info on init', () => {
      const mockResponse: AdminInfoResponse = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
      };

      mockAdminAccountService.getAdminInfo.mockReturnValue(of(mockResponse));

      component.ngOnInit();

      expect(mockAdminAccountService.getAdminInfo).toHaveBeenCalled();
      expect(component.adminInfo).toEqual(mockResponse);
    });
  });

  describe('loadAdminInfo', () => {
    it('should update admin info on success', () => {
      const mockResponse: AdminInfoResponse = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
      };

      mockAdminAccountService.getAdminInfo.mockReturnValue(of(mockResponse));

      component.loadAdminInfo();

      expect(mockAdminAccountService.getAdminInfo).toHaveBeenCalled();
      expect(component.adminInfo).toEqual(mockResponse);
    });

    it('should handle error on loading admin info', () => {
      const errorResponse = 'Error loading admin info';

      mockAdminAccountService.getAdminInfo.mockReturnValue(
        throwError(() => new Error(errorResponse)),
      );

      component.loadAdminInfo();

      expect(mockAdminAccountService.getAdminInfo).toHaveBeenCalled();
      expect(component.adminInfo).toEqual({} as AdminInfoResponse);
    });
  });

  describe('getFullNameAdmin', () => {
    it('should return the full name of the admin', () => {
      component.adminInfo = {
        first_name: 'John',
        last_name: 'Doe',
      } as AdminInfoResponse;

      const fullName = component.getFullNameAdmin();
      expect(fullName).toBe('John Doe');
    });
  });

  describe('getGreetingMessage', () => {
    it('should return "Bonjour" during the day', () => {
      jest.spyOn(Date.prototype, 'getHours').mockReturnValue(10);
      expect(component.getGreetingMessage()).toBe('Bonjour');
    });

    it('should return "Bonsoir" in the evening', () => {
      jest.spyOn(Date.prototype, 'getHours').mockReturnValue(19);
      expect(component.getGreetingMessage()).toBe('Bonsoir');
    });
  });

  describe('onUpdate', () => {
    it('should reload admin info', () => {
      jest.spyOn(component, 'loadAdminInfo').mockImplementation(() => {});
      component.onUpdate();
      expect(component.loadAdminInfo).toHaveBeenCalled();
    });
  });
});
