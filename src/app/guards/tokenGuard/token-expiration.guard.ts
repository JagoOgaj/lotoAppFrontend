import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { Roles } from '../../constants/ressources/auth/RoleRessource';

@Injectable({
  providedIn: 'root',
})
export class TokenExpirationGuard implements CanActivate {
  private canAccess: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  canActivate(): boolean {
    if (this.canAccess) {
      this.canAccess = false;
      return true;
    }
    const userRole = this.authService.getUserRole();
    if (userRole == Roles.ADMIN) {
      this.router.navigate(['/admin']);
      return false;
    } else if (userRole == Roles.USER) {
      this.router.navigate(['/account']);
      return false;
    }
    this.router.navigate(['/home']);
    return false;
  }
  enableAccess() {
    this.canAccess = true;
  }
}
