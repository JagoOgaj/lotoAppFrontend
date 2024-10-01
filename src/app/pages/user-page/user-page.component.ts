import { Component, OnInit } from '@angular/core';
import { FooterSharedComponent } from '../../shared/footer-shared/footer-shared.component';
import { NavbarSharedComponent } from '../../shared/navbar-shared/navbar-shared.component';
import { UserInformationsComponent } from '../../shared/user/user-informations/user-informations.component';
import { UserPasswordComponent } from '../../shared/user/user-password/user-password.component';
import { UserPlayComponent } from '../../shared/user/user-play/user-play.component';
import { UserHistoryComponent } from '../../shared/user/user-history/user-history.component';
import { UserInfoRessource } from '../../constants/ressources/user/userInfoRessource';
import { UserPageServiceService } from './service/user-page-service.service';
import { AuthService } from '../../core/service/auth.service';

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
  userInfo: UserInfoRessource;

  constructor(
    private userService: UserPageServiceService,
    private authService: AuthService,
  ) {
    this.userInfo = {} as UserInfoRessource;
  }

  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo(): void {
    this.userService.getUserInfo().subscribe({
      next: (data) => {
        this.userInfo = data;
      },
      error: (err) => {},
    });
  }

  logout(): void {
    this.userService.logoutUser().subscribe({
      next: (data) => {},
      error: (err) => {},
    });
    this.authService.logout();
  }

  getFullNameUser(): string {
    return `${this.userInfo.first_name} ${this.userInfo.last_name}`;
  }
}
