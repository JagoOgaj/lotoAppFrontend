import { Component } from '@angular/core';
import { CountdownTimerComponent } from '../../timer/countdown-timer/countdown-timer.component';
import { LottoryFormComponent } from '../../lottory-form/lottory-form.component';

@Component({
  selector: 'app-user-play',
  standalone: true,
  imports: [CountdownTimerComponent, LottoryFormComponent],
  templateUrl: './user-play.component.html',
  styleUrl: './user-play.component.css',
})
export class UserPlayComponent {
  dateTest = new Date(new Date().getTime() + 10000);
}
