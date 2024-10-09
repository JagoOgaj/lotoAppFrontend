import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AcountAdminService } from '../../../pages/admin/account-admin/service/acount-admin.service';
import { AuthService } from '../../../core/service/auth.service';
import { switchMap } from 'rxjs';

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

  constructor(
    private adminAccountService: AcountAdminService,
    private authService: AuthService,
    private router: Router,
  ) {}

  toggleCollapse(): void {
    this.setIsSlideBarCollapsed.emit(!this.isSlideBarCollapsed());
  }

  closeSlideBar(): void {
    this.setIsSlideBarCollapsed.emit(true);
  }

  logoutAdmin(): void {
    // Commencez par appeler logout() du service adminAccountService
    this.adminAccountService
      .logout()
      .pipe(
        switchMap(() => {
          // Si logout réussit, appelez authService.logout() pour nettoyer les tokens
          return this.authService.logout(); // Assurez-vous que cette méthode retourne un Observable
        }),
      )
      .subscribe({
        next: () => {
          // Ici, vous pouvez naviguer vers la page d'accueil après un logout réussi
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Error during logout:', err);
          // En cas d'erreur, nettoyez les tokens et redirigez vers la page d'accueil
          this.authService.clearTokens(); // Assurez-vous que les tokens sont nettoyés
          this.router.navigate(['/home']); // Naviguer vers la page d'accueil
        },
      });
  }
}
