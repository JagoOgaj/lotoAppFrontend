import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FooterSharedComponent } from '../../shared/footer-shared/footer-shared.component';
import { NavbarSharedComponent } from '../../shared/navbar-shared/navbar-shared.component';

@Component({
  selector: 'app-login-register-page',
  standalone: true,
  imports: [CommonModule, FooterSharedComponent, NavbarSharedComponent],
  templateUrl: './login-register-page.component.html',
  styleUrl: './login-register-page.component.css',
})
export class LoginRegisterPageComponent implements OnInit {
  pageState: string = 'login';
  activeTab: string = 'login';

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  selectTab(tabName: string): void {
    this.activeTab = tabName;
  }
}
