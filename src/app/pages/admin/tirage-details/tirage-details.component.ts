import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TirageEditComponent } from '../../../shared/admin/tirage-edit/tirage-edit.component';
import { ActivatedRoute } from '@angular/router';
import { LotteryOverviewResponse } from '../../../constants/ressources/user/tirageUserRessource';
import { AdminSharedService } from '../service/admin-shared.service';

@Component({
  selector: 'app-tirage-details',
  standalone: true,
  imports: [TirageEditComponent],
  templateUrl: './tirage-details.component.html',
  styleUrl: './tirage-details.component.css',
})
export class TirageDetailsComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  tirageOverview: LotteryOverviewResponse;
  tirageId: number | null = null;

  constructor(private tirageDetailsAdmin: AdminSharedService) {
    this.tirageOverview = {} as LotteryOverviewResponse;
  }

  ngOnInit(): void {
    const idNullable = this.activatedRoute.snapshot.paramMap.get('id');
    if (idNullable) {
      this.tirageId = +idNullable;
    }
  }

  loadTirageDetails(id: number): void {
    this.tirageDetailsAdmin.getTirageDetails(id).subscribe({
      next: (data) => {
        this.tirageOverview = data.data;
      },
      error: (err) => {},
    });
  }

  onTirageUpdate(): void {
    if (this.tirageId) {
      this.loadTirageDetails(this.tirageId);
    }
  }
}
