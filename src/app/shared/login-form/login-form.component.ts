import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserLoginService } from './service/user-login.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  LoginData,
  LoginErrors,
} from '../../constants/ressources/user/LoginUserRessource';
import { AuthService } from '../../core/service/auth.service';
import { switchMap } from 'rxjs';

/**
 * Composant pour le formulaire de connexion des utilisateurs.
 * @component
 */
@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent implements OnInit {
  @Output() tabChange = new EventEmitter<string>();
  loginForm: FormGroup;
  serverErrors: LoginErrors | null = null;

  /**
   * Constructeur du composant.
   * @param {FormBuilder} fb - Service de construction de formulaires.
   * @param {UserLoginService} loginService - Service pour gérer la connexion des utilisateurs.
   * @param {Router} router - Service de routage.
   * @param {AuthService} authService - Service pour gérer l'authentification.
   */
  constructor(
    private fb: FormBuilder,
    private loginService: UserLoginService,
    private router: Router,
    private authService: AuthService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {}

  /**
   * Soumet le formulaire de connexion.
   */
  onSubmit(): void {
    this.serverErrors = null;
    if (this.loginForm.valid) {
      const data: LoginData = this.loginForm.value;
      this.loginService
        .login(data)
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
            this.router.navigate(['/account']);
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
   * Change l'onglet actif.
   */
  onTabChange(): void {
    this.tabChange.emit('registry');
  }
}
