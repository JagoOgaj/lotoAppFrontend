import { Component, OnInit } from '@angular/core';
import { FooterSharedComponent } from '../../shared/footer-shared/footer-shared.component';
import { NavbarSharedComponent } from '../../shared/navbar-shared/navbar-shared.component';
import { UserInformationsComponent } from '../../shared/user/user-informations/user-informations.component';
import { UserPasswordComponent } from '../../shared/user/user-password/user-password.component';
import { UserPlayComponent } from '../../shared/user/user-play/user-play.component';
import { UserHistoryComponent } from '../../shared/user/user-history/user-history.component';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    NavbarSharedComponent,
    UserInformationsComponent,
    UserPasswordComponent,
    UserPlayComponent,
    UserHistoryComponent,
    FooterSharedComponent,
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css',
})
export class UserPageComponent implements OnInit {
  pageState: string = 'login';

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
