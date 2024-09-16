import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FooterSharedComponent } from '../../shared/footer-shared/footer-shared.component';

@Component({
  selector: 'app-login-register-page',
  standalone: true,
  imports: [CommonModule, FooterSharedComponent],
  templateUrl: './login-register-page.component.html',
  styleUrl: './login-register-page.component.css'
})
export class LoginRegisterPageComponent {

  activeTab: string = 'login';

  selectTab(tabName: string): void {
    this.activeTab = tabName;
  }

}
