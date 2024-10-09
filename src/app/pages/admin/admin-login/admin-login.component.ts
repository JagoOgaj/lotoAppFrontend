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

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup;
  serverErrors: LoginAdminErrors | null = null;

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

  ngOnInit(): void {}

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

  goToHome() {
    this.router.navigate(['/home']);
  }
}
