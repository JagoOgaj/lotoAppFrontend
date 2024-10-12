import { Component } from '@angular/core';
import { AuthService } from '../../core/service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Roles } from '../../constants/ressources/auth/RoleRessource';

/**
 * @component TokenExpirationComponent
 * @description
 * Ce composant gère la logique de rafraîchissement des tokens d'authentification et de déconnexion des utilisateurs.
 * Lorsqu'un token expire, il permet de le rafraîchir et de rediriger l'utilisateur vers la bonne page en fonction de son rôle.
 * Il fournit également des notifications à l'utilisateur à l'aide de Toastr.
 */
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

  /**
   * Rafraîchit le token d'authentification.
   * En cas de succès, affiche un message de succès et redirige vers la page appropriée
   * en fonction du rôle de l'utilisateur. En cas d'erreur, affiche un message d'erreur,
   * nettoie les tokens et déconnecte l'utilisateur.
   */
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

  /**
   * Déconnecte l'utilisateur.
   * Rafraîchit le token, nettoie le rôle de l'utilisateur et redirige vers la page d'accueil.
   */
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
