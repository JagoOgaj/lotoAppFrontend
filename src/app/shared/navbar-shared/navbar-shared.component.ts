import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-shared',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar-shared.component.html',
  styleUrl: './navbar-shared.component.css',
})
export class NavbarSharedComponent {
  private readonly route = inject(Router);
  isScrolled: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event): void {
    const scrollPosition = window.scrollY || window.pageYOffset;
    this.isScrolled = scrollPosition > 50;
  }

  redirectToLR() : void {
    this.route.navigateByUrl("login");
  }
}
