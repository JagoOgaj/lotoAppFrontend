import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { LotteryOverviewResponse } from '../../../constants/ressources/user/tirageUserRessource';
import { TirageStatus } from '../../../constants/tirageStatus/tirageStatus.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tirage-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tirage-overview.component.html',
  styleUrl: './tirage-overview.component.css',
})
export class TirageOverviewComponent {
  @Input() tirage!: LotteryOverviewResponse;
  private router = inject(Router);

  showDetails() {
    this.router.navigate(['/admin/tirage-details', this.tirage.id]);
  }

  renderStatusToTemplate(status: string): string {
    if (status == TirageStatus.EN_COUR) {
      return 'En cours';
    } else if (status == TirageStatus.EN_VALIDATION) {
      return 'En validation';
    } else if (status == TirageStatus.TERMINE) {
      return 'Termine';
    } else if (status == TirageStatus.SIMULATION) {
      return 'Simulation';
    } else if (status == TirageStatus.SIMULATION_TERMINE) {
      return 'Simmulation termine';
    }
    return '';
  }
}
