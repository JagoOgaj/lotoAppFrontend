import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LotteryOverviewResponse } from '../../../constants/ressources/user/tirageUserRessource';

@Component({
  selector: 'app-draw-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './draw-overview.component.html',
  styleUrls: ['./draw-overview.component.css'],
})
export class DrawOverviewComponent {
  @Input() drawData!: LotteryOverviewResponse;

  name: string = '';
  startDate: Date | string = 'Non spécifiée';
  endDate: Date | string = 'Non spécifiée';
  rewardPrice: number = 0;
  participantCount: number = 0;

  ngOnInit(): void {
    this.name = this.drawData.name;
    this.startDate = this.drawData.start_date
      ? new Date(this.drawData.start_date)
      : 'Non spécifiée';
    this.endDate = this.drawData.end_date
      ? new Date(this.drawData.end_date)
      : 'Non spécifiée';
    this.rewardPrice = this.drawData.reward_price;
    this.participantCount = this.drawData.participant_count;
  }
}
