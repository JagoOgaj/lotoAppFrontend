import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AcountAdminService } from '../../../pages/admin/account-admin/service/acount-admin.service';
import { AuthService } from '../../../core/service/auth.service';
import { switchMap } from 'rxjs';

/**
 * Component representing a sidebar for navigation.
 *
 * @component
 */
@Component({
  selector: 'app-slide-bar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './slide-bar.component.html',
  styleUrl: './slide-bar.component.css',
})
export class SlideBarComponent {
  isSlideBarCollapsed = input.required<boolean>();
  setIsSlideBarCollapsed = output<boolean>();
  items = [
    {
      routerLink: 'tirage-list',
      icon: 'bi bi-list-ul',
      label: 'Listes des tirages',
    },
    {
      routerLink: 'account',
      icon: 'bi bi-play-fill',
      label: 'Compte',
    },
  ];

  /**
   * Crée une instance du composant.
   * @param {AcountAdminService} adminAccountService - Service pour la gestion des comptes administrateurs.
   * @param {AuthService} authService - Service pour l'authentification des utilisateurs.
   * @param {Router} router - Service pour la navigation entre les routes.
   */
  constructor(
    private adminAccountService: AcountAdminService,
    private authService: AuthService,
    private router: Router,
  ) {}

  /**
   * Bascule l'état de la barre latérale entre réduit et étendu.
   * @returns {void}
   */
  toggleCollapse(): void {
    this.setIsSlideBarCollapsed.emit(!this.isSlideBarCollapsed());
  }

  /**
   * Ferme la barre latérale.
   * @returns {void}
   */
  closeSlideBar(): void {
    this.setIsSlideBarCollapsed.emit(true);
  }

  /**
   * Déconnecte l'administrateur et redirige vers la page d'accueil.
   * @returns {void}
   */
  logoutAdmin(): void {
    this.adminAccountService
      .logout()
      .pipe(
        switchMap(() => {
          return this.authService.logout();
        }),
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.authService.clearTokens();
          this.router.navigate(['/home']);
        },
      });
  }
}
