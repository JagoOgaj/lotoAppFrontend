import { Component, OnInit } from '@angular/core';
import { NavbarSharedComponent } from '../../shared/navbar-shared/navbar-shared.component';
import { HeroSharedComponent } from '../../shared/hero-shared/hero-shared.component';
import { FooterSharedComponent } from '../../shared/footer-shared/footer-shared.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NavbarSharedComponent, HeroSharedComponent, FooterSharedComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  pageState: string = 'home';

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
