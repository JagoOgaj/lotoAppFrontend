import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer-shared',
  standalone: true,
  imports: [],
  templateUrl: './footer-shared.component.html',
  styleUrl: './footer-shared.component.css',
})
export class FooterSharedComponent {
  private router: Router = inject(Router);

  goToAdminLogin(): void {
    this.router.navigate(['login-admin']);
  }
}
