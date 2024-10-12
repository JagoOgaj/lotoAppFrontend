import { Component, OnInit } from '@angular/core';
import { FooterSharedComponent } from '../../shared/footer-shared/footer-shared.component';
import { NavbarSharedComponent } from '../../shared/navbar-shared/navbar-shared.component';
import { UserInformationsComponent } from '../../shared/user/user-informations/user-informations.component';
import { UserPasswordComponent } from '../../shared/user/user-password/user-password.component';
import { UserPlayComponent } from '../../shared/user/user-play/user-play.component';
import { UserHistoryComponent } from '../../shared/user/user-history/user-history.component';
import { UserInfoRessource } from '../../constants/ressources/user/userInfoRessource';
import { UserPageServiceService } from './service/user-page-service.service';
import { AuthService } from '../../core/service/auth.service';
import { switchMap } from 'rxjs';
import { Router } from '@angular/router';

/**
 * Composant représentant la page utilisateur.
 * Affiche les informations de l'utilisateur, permet de modifier le mot de passe,
 * de visualiser les jeux et l'historique de l'utilisateur, et de se déconnecter.
 */
@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    NavbarSharedComponent,
    UserInformationsComponent,
    UserPasswordComponent,
    UserPlayComponent,
    UserHistoryComponent,
    FooterSharedComponent,
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css',
})
export class UserPageComponent implements OnInit {
  pageState: string = 'login';
  userInfo: UserInfoRessource;

  /**
   * Constructeur du composant UserPageComponent.
   * @param userService Service pour la gestion des informations utilisateur.
   * @param authService Service d'authentification.
   * @param router Service de routage.
   */
  constructor(
    private userService: UserPageServiceService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.userInfo = {} as UserInfoRessource;
  }

  /**
   * Méthode du cycle de vie qui s'exécute à l'initialisation du composant.
   * Charge les informations de l'utilisateur.
   */
  ngOnInit(): void {
    this.loadUserInfo();
  }

  /**
   * Charge les informations de l'utilisateur à partir du service.
   */
  loadUserInfo(): void {
    this.userService.getUserInfo().subscribe({
      next: (data) => {
        this.userInfo = data;
      },
      error: (err) => {},
    });
  }

  /**
   * Déconnecte l'utilisateur et redirige vers la page d'accueil.
   */
  logout(): void {
    this.userService
      .logoutUser()
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
          console.error('Error during logout:', err);
          this.authService.clearTokens();
          this.router.navigate(['/home']);
        },
      });
  }

  /**
   * Récupère le nom complet de l'utilisateur.
   * @returns Le nom complet de l'utilisateur au format "Prénom Nom".
   */
  getFullNameUser(): string {
    return `${this.userInfo.first_name} ${this.userInfo.last_name}`;
  }
}
