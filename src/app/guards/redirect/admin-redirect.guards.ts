import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { Roles } from '../../constants/ressources/auth/RoleRessource';

/**
 * Garde d'authentification pour rediriger les utilisateurs administrateurs.
 */
@Injectable({
  providedIn: 'root',
})
export class RedirectAdminAuthGuard implements CanActivate {
  /**
   * Constructeur du garde d'authentification.
   * @param {AuthService} authService - Service d'authentification pour vérifier le statut de connexion et le rôle de l'utilisateur.
   * @param {Router} router - Service de routage pour effectuer des redirections.
   */
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  /**
   * Méthode appelée pour déterminer si l'activation de la route est autorisée.
   * @returns {boolean} - Retourne false si l'utilisateur est authentifié et a le rôle ADMIN, ce qui entraîne une redirection.
   * Retourne true sinon.
   */
  canActivate(): boolean {
    const userRole = this.authService.getUserRole();

    if (this.authService.isAuthenticated() && userRole === Roles.ADMIN) {
      this.router.navigate(['/admin']);
      return false;
    }

    return true;
  }
}
