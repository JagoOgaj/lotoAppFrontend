import { Component } from '@angular/core';
import { AuthService } from '../../core/service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Roles } from '../../constants/ressources/auth/RoleRessource';

@Component({
  selector: 'app-token-expiration',
  standalone: true,
  imports: [],
  templateUrl: './token-expiration.component.html',
  styleUrl: './token-expiration.component.css',
})
export class TokenExpirationComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  // Action de rafraîchir le token
  onRefreshToken(): void {
    this.authService.refreshToken().subscribe({
      next: (newToken: string) => {
        this.toastr.success('Session rafraîchie avec succès');
        const userRole = this.authService.getUserRole();
        if (userRole == Roles.ADMIN) {
          this.router.navigate(['/admin']);
        } else if (userRole == Roles.USER) {
          this.router.navigate(['/account']);
        }
      },
      error: (err) => {
        this.toastr.error(
          'Impossible de rafraîchir le token. Veuillez vous reconnecter.',
        );
        this.authService.clearTokens();
        this.authService.logout();
        this.router.navigate(['/home']);
      },
    });
  }

  onLogout(): void {
    this.authService.refreshToken().subscribe({
      next: () => {
        this.authService.clearUserRole();
        this.router.navigate(['/home']);
        this.toastr.success('Vous êtes déconnecté.');
      },
      error: () => {},
    });
  }
}
