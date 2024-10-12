import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { Roles } from '../../constants/ressources/auth/RoleRessource';

/**
 * Garde d'authentification pour gérer l'expiration du token.
 */
@Injectable({
  providedIn: 'root',
})
export class TokenExpirationGuard implements CanActivate {
  private canAccess: boolean = false;

  /**
   * Constructeur du garde d'expiration de token.
   * @param {Router} router - Service de routage pour effectuer des redirections.
   * @param {AuthService} authService - Service d'authentification pour vérifier le statut de connexion et le rôle de l'utilisateur.
   */
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  /**
   * Méthode appelée pour déterminer si l'activation de la route est autorisée.
   * @returns {boolean} - Retourne true si l'accès est autorisé ; sinon, effectue une redirection.
   */
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

  /**
   * Méthode pour activer l'accès aux routes protégées.
   */
  enableAccess() {
    this.canAccess = true;
  }
}
