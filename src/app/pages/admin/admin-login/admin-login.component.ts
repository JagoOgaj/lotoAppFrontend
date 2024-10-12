import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  LoginAdminData,
  LoginAdminErrors,
} from '../../../constants/ressources/admin/AdminLoginRessource';
import { AdminLoginService } from './service/admin-login.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/service/auth.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';

/**
 * Composant pour la connexion de l'administrateur.
 * @class
 */
@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent implements OnInit {
  /** Formulaire réactif pour la connexion. */
  loginForm: FormGroup;
  /** Erreurs du serveur lors de la connexion. */
  serverErrors: LoginAdminErrors | null = null;

  /**
   * Constructeur du composant AdminLoginComponent.
   * @param {FormBuilder} fb - Service de création de formulaires réactifs.
   * @param {AdminLoginService} adminLoginService - Service de connexion de l'administrateur.
   * @param {AuthService} authService - Service d'authentification.
   * @param {Router} router - Service de navigation.
   */
  constructor(
    private fb: FormBuilder,
    private adminLoginService: AdminLoginService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  /** Méthode appelée lors de l'initialisation du composant. */
  ngOnInit(): void {}

  /**
   * Soumet le formulaire de connexion.
   * En cas de succès, redirige vers la page d'administration.
   * En cas d'erreur, stocke les erreurs du serveur.
   */
  onSubmit(): void {
    this.serverErrors = null;
    if (this.loginForm.valid) {
      const data: LoginAdminData = this.loginForm.value;
      this.adminLoginService
        .loginAdmin(data)
        .pipe(
          switchMap((response) => {
            this.authService.setTokens(
              response.access_token,
              response.refresh_token,
            );
            return this.authService.setUserRole();
          }),
        )
        .subscribe({
          next: () => {
            this.router.navigate(['/admin']);
            this.loginForm.reset();
          },
          error: (err) => {
            this.serverErrors = err;
            this.loginForm.reset();
          },
        });
    }
  }

  /**
   * Redirige vers la page d'accueil.
   */
  goToHome() {
    this.router.navigate(['/home']);
  }
}
