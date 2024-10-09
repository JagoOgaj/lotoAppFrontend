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
    if (isAuthenticated && userRole === Roles.USER) {
      // Redirige l'utilisateur vers /account s'il est déjà connecté
      router.navigate(['/account']);
      return false;
    }
    return true; // Autoriser l'accès à la route login si non authentifis
  }

  if (route.routeConfig?.path === 'login-admin') {
    if (isAuthenticated && userRole === Roles.ADMIN) {
      // Redirige l'utilisateur vers /admin s'il est déjà authentifié et est un admin
      router.navigate(['/admin']);
      return false;
    }
    return true; // Autoriser l'accès à la route login-admin si non authentifié ou rôle non admin
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
