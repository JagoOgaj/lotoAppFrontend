import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserRegistryService } from './service/user-registry.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { CommonModule } from '@angular/common';
import {
  RegistryData,
  RegistryErrors,
} from '../../constants/ressources/user/registryUserRessource';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent implements OnInit {
  @Output() tabChange = new EventEmitter<string>();

  registryForm: FormGroup;
  serverErrors: RegistryErrors | null = null;
  constructor(
    private fb: FormBuilder,
    private registerService: UserRegistryService,
    private router: Router,
    private authService: AuthService,
  ) {
    this.registryForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.serverErrors = null;
    if (this.registryForm.valid) {
      const data: RegistryData = this.registryForm.value;
      this.registerService.registry(data).subscribe({
        next: (response) => {
          this.authService.setTokens(
            response.access_token,
            response.refresh_token,
          );
          this.router.navigate(['/account']);
          this.registryForm.reset();
        },
        error: (err: RegistryErrors) => {
          this.serverErrors = err;
        },
      });
    }
  }

  onTabChange(): void {
    this.tabChange.emit('login');
  }
}
