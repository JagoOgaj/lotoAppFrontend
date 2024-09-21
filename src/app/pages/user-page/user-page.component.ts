import { Component, OnInit } from '@angular/core';
import { NavbarSharedComponent } from '../../shared/navbar-shared/navbar-shared.component';
import { CountdownTimerComponent } from '../../shared/timer/countdown-timer/countdown-timer.component';
import { UserInformationsComponent } from '../../shared/user/user-informations/user-informations.component';
import { UserPasswordComponent } from '../../shared/user/user-password/user-password.component';
import { LottoryFormComponent } from '../../shared/lottory-form/lottory-form.component';
import { FooterSharedComponent } from '../../shared/footer-shared/footer-shared.component';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    NavbarSharedComponent,
    UserInformationsComponent,
    UserPasswordComponent,
    CountdownTimerComponent,
    LottoryFormComponent,
    FooterSharedComponent,
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css',
})
export class UserPageComponent implements OnInit {
  pageState: string = 'login';
  dateTest = new Date(new Date().getTime() + 10000);

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
