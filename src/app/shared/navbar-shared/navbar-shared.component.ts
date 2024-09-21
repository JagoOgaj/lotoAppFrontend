import { Component, HostListener, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PAGES_WHITH_HERO_SECTION } from '../../constants/pages/pages.constants';

@Component({
  selector: 'app-navbar-shared',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar-shared.component.html',
  styleUrl: './navbar-shared.component.css',
})
export class NavbarSharedComponent implements OnInit {
  private readonly route = inject(Router);
  @Input() pageState!: string;
  isScrolled: boolean = false;
  needBg: boolean = false;

  ngOnInit(): void {
    this.needBg = !PAGES_WHITH_HERO_SECTION.includes(this.pageState);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event): void {
    const scrollPosition = window.scrollY || window.pageYOffset;
    this.isScrolled = scrollPosition > 50;
  }

  redirectTo(page: string): void {
    this.route.navigateByUrl(page);
  }
}
