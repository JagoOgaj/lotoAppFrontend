import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar-shared',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar-shared.component.html',
  styleUrl: './navbar-shared.component.css'
})
export class NavbarSharedComponent {
  isScrolled: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event): void {
    const scrollPosition = window.scrollY || window.pageYOffset;
    this.isScrolled = scrollPosition > 50;
  }

}
