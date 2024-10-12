import { Component, OnInit } from '@angular/core';
import { AdminInfoComponent } from '../../../shared/admin/admin-info/admin-info.component';
import { AdminPwdComponent } from '../../../shared/admin/admin-pwd/admin-pwd.component';
import { AdminInfoResponse } from '../../../constants/ressources/admin/AdminInfoRessource';
import { AcountAdminService } from './service/acount-admin.service';
import { AuthService } from '../../../core/service/auth.service';

/**
 * Le composant `AccountAdminComponent` est responsable de la gestion des informations de l'administrateur.
 * Il affiche les informations de compte de l'administrateur et fournit des fonctionnalités pour mettre à jour ces informations.
 */
@Component({
  selector: 'app-account-admin',
  standalone: true,
  imports: [AdminInfoComponent, AdminPwdComponent],
  templateUrl: './account-admin.component.html',
  styleUrl: './account-admin.component.css',
})
export class AccountAdminComponent implements OnInit {
  /** Informations de l'administrateur */
  adminInfo: AdminInfoResponse;

  /**
   * Crée une instance de `AccountAdminComponent`.
   * @param adminAccountService - Service pour gérer les informations du compte administrateur.
   * @param authService - Service pour gérer l'authentification.
   */
  constructor(
    private adminAccountService: AcountAdminService,
    private authService: AuthService,
  ) {
    this.adminInfo = {} as AdminInfoResponse;
  }

  /**
   * Méthode de cycle de vie appelée après que le composant soit initialisé.
   * Charge les informations de l'administrateur.
   */
  ngOnInit(): void {
    this.loadAdminInfo();
  }

  /**
   * Charge les informations de l'administrateur en appelant le service approprié.
   * Met à jour la propriété `adminInfo` avec les données reçues.
   */
  loadAdminInfo(): void {
    this.adminAccountService.getAdminInfo().subscribe({
      next: (data) => {
        this.adminInfo = data;
      },
      error: (err) => {},
    });
  }

  /**
   * Obtient le nom complet de l'administrateur en concaténant le prénom et le nom de famille.
   * @returns Le nom complet de l'administrateur.
   */
  getFullNameAdmin(): string {
    return `${this.adminInfo.first_name} ${this.adminInfo.last_name}`;
  }

  /**
   * Méthode appelée pour mettre à jour les informations de l'administrateur.
   * Recharge les informations de l'administrateur.
   */
  onUpdate(): void {
    this.loadAdminInfo();
  }

  /**
   * Obtient un message de salutation basé sur l'heure actuelle.
   * @returns Un message de salutation (Bonjour ou Bonsoir).
   */
  getGreetingMessage(): string {
    const currentHour = new Date().getHours();
    return currentHour >= 18 ? 'Bonsoir' : 'Bonjour';
  }
}
