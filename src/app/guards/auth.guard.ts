import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../core/service/auth.service';
import { Roles } from '../constants/ressources/auth/RoleRessource';

/**
 * Garde d'authentification pour contrôler l'accès aux routes en fonction du rôle de l'utilisateur.
 * @param route - La route demandée par l'utilisateur.
 * @param state - L'état de la route.
 * @returns {boolean} - Retourne true si l'accès est autorisé, sinon false.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const userRole = authService.getUserRole();
  const isAuthenticated = authService.isAuthenticated();

  if (route.routeConfig?.path === 'login') {
    if (isAuthenticated && userRole === Roles.USER) {
      router.navigate(['/account']);
      return false;
    }
    return true;
  }

  if (route.routeConfig?.path === 'login-admin') {
    if (isAuthenticated && userRole === Roles.ADMIN) {
      router.navigate(['/admin']);
      return false;
    }
    return true;
  }

  if (
    route.routeConfig &&
    route.routeConfig.path &&
    route.routeConfig?.path.startsWith('admin') &&
    userRole !== Roles.ADMIN
  ) {
    router.navigate(['/login-admin']);
    return false;
  }

  return true;
};
