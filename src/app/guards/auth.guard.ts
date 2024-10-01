import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../core/service/auth.service';
import { Roles } from '../constants/ressources/auth/RoleRessource';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const userRole = authService.getUserRole();
  const isAuthenticated = authService.isAuthenticated();

  // Vérification de la route login
  if (route.routeConfig?.path === 'login') {
    if (isAuthenticated) {
      // Redirige l'utilisateur vers /account s'il est déjà connecté
      router.navigate(['/account']);
      return false;
    }
    return true; // Autoriser l'accès à la route login si non authentifié
  }

  // Vérification des routes protégées pour account et draw/:id
  if (
    route.routeConfig &&
    (route.routeConfig.path === 'account' ||
      route.routeConfig.path === 'draw/:id')
  ) {
    // L'utilisateur doit être authentifié
    if (!isAuthenticated) {
      router.navigate(['/login']);
      return false;
    }
    return true; // L'utilisateur est authentifié, autoriser l'accès
  }

  // Vérification des routes admin
  if (
    route.routeConfig &&
    route.routeConfig.path &&
    route.routeConfig?.path.startsWith('admin') &&
    userRole !== Roles.ADMIN
  ) {
    // L'utilisateur doit être un admin
    router.navigate(['/login-admin']); // Rediriger vers la page de connexion
    return false;
  }

  return true; // Par défaut, autoriser l'accès à d'autres routes
};
