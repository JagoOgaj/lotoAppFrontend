// redirect-auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { Roles } from '../../constants/ressources/auth/RoleRessource';

@Injectable({
  providedIn: 'root',
})
export class RedirectUserAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    const userRole = this.authService.getUserRole();
    if (this.authService.isAuthenticated() && userRole === Roles.USER) {
      this.router.navigate(['/account']);
      return false;
    }
    return true;
  }
}
