import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TokenExpirationComponent } from './token-expiration.component';
import { AuthService } from '../../core/service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { Roles } from '../../constants/ressources/auth/RoleRessource';

interface AuthServiceMock {
  refreshToken: jest.Mock;
  getUserRole: jest.Mock;
  clearTokens: jest.Mock;
  logout: jest.Mock;
  clearUserRole: jest.Mock;
}

describe('TokenExpirationComponent', () => {
  let component: TokenExpirationComponent;
  let fixture: ComponentFixture<TokenExpirationComponent>;
  let authService: AuthServiceMock;
  let router: Router;
  let toastr: ToastrService;

  beforeEach(async () => {
    const authServiceMock: AuthServiceMock = {
      refreshToken: jest.fn(),
      getUserRole: jest.fn(),
      clearTokens: jest.fn(),
      logout: jest.fn(),
      clearUserRole: jest.fn(),
    };

    const routerMock = {
      navigate: jest.fn(),
    };

    const toastrMock = {
      success: jest.fn(),
      error: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [TokenExpirationComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ToastrService, useValue: toastrMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TokenExpirationComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as unknown as AuthServiceMock;
    router = TestBed.inject(Router);
    toastr = TestBed.inject(ToastrService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should refresh the token successfully and navigate to admin', () => {
    authService.refreshToken.mockReturnValue(of('new-token'));
    authService.getUserRole.mockReturnValue(Roles.ADMIN);

    component.onRefreshToken();

    expect(toastr.success).toHaveBeenCalledWith(
      'Session rafraîchie avec succès',
    );
    expect(router.navigate).toHaveBeenCalledWith(['/admin']);
  });

  it('should refresh the token successfully and navigate to user account', () => {
    authService.refreshToken.mockReturnValue(of('new-token'));
    authService.getUserRole.mockReturnValue(Roles.USER);

    component.onRefreshToken();

    expect(toastr.success).toHaveBeenCalledWith(
      'Session rafraîchie avec succès',
    );
    expect(router.navigate).toHaveBeenCalledWith(['/account']);
  });

  it('should handle error when refreshing token', () => {
    authService.refreshToken.mockReturnValue(
      throwError(() => new Error('Token error')),
    );

    component.onRefreshToken();

    expect(toastr.error).toHaveBeenCalledWith(
      'Impossible de rafraîchir le token. Veuillez vous reconnecter.',
    );
    expect(authService.clearTokens).toHaveBeenCalled();
    expect(authService.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should logout successfully', () => {
    authService.refreshToken.mockReturnValue(of('new-token'));

    component.onLogout();

    expect(authService.clearUserRole).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
    expect(toastr.success).toHaveBeenCalledWith('Vous êtes déconnecté.');
  });
});
