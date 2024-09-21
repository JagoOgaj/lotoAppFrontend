import { Component, OnInit } from '@angular/core';
import { NavbarSharedComponent } from '../../shared/navbar-shared/navbar-shared.component';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [NavbarSharedComponent],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css',
})
export class UserPageComponent implements OnInit {
  pageState: string = 'login';

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
