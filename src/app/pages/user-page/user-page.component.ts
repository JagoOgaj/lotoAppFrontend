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
import { switchMap } from 'rxjs';
import { Router } from '@angular/router';

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
    private router: Router,
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
    this.userService
      .logoutUser()
      .pipe(
        switchMap(() => {
          return this.authService.logout();
        }),
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Error during logout:', err);
          this.authService.clearTokens();
          this.router.navigate(['/home']);
        },
      });
  }

  getFullNameUser(): string {
    return `${this.userInfo.first_name} ${this.userInfo.last_name}`;
  }
}
