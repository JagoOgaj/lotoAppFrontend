import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SlideBarComponent } from './slide-bar.component';
import { AcountAdminService } from '../../../pages/admin/account-admin/service/acount-admin.service';
import { AuthService } from '../../../core/service/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('SlideBarComponent', () => {
  let component: SlideBarComponent;
  let fixture: ComponentFixture<SlideBarComponent>;
  let adminAccountService: jest.Mocked<AcountAdminService>;
  let authService: jest.Mocked<AuthService>;
  let router: jest.Mocked<Router>;

  beforeEach(() => {
    adminAccountService = {
      logout: jest.fn(),
    } as any;

    authService = {
      logout: jest.fn(),
      clearTokens: jest.fn(),
    } as any;

    router = {
      navigate: jest.fn(),
    } as any;

    TestBed.configureTestingModule({
      imports: [SlideBarComponent],
      providers: [
        { provide: AcountAdminService, useValue: adminAccountService },
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SlideBarComponent);
    component = fixture.componentInstance;
  });

  it('should initialize the component correctly', () => {
    expect(component).toBeTruthy();
    expect(component.items.length).toBe(2);
  });

  it('should close the sidebar', () => {
    jest.spyOn(component.setIsSlideBarCollapsed, 'emit');

    component.closeSlideBar();
    expect(component.setIsSlideBarCollapsed.emit).toHaveBeenCalledWith(true);
  });

  it('should log out and redirect to the home page', () => {
    adminAccountService.logout.mockReturnValue(of({ message: '' }));
    authService.logout.mockReturnValue(of({}));

    component.logoutAdmin();
    expect(adminAccountService.logout).toHaveBeenCalled();
    expect(authService.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should handle logout errors', () => {
    const errorResponse = new Error('Logout error');
    adminAccountService.logout.mockReturnValue(throwError(() => errorResponse));

    component.logoutAdmin();
    expect(authService.clearTokens).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });
});
