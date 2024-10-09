import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TirageOverviewComponent } from '../../../shared/admin/tirage-overview/tirage-overview.component';
import { ParticipantsListComponent } from '../../../shared/admin/participants-list/participants-list.component';
import { AdminSharedService } from '../service/admin-shared.service';
import { LotteryOverviewResponse } from '../../../constants/ressources/user/tirageUserRessource';
import { Participants } from '../../../constants/ressources/admin/AdminParticipantsRessource';
import { ManageParticipantsService } from './service/manage-participants.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-participants',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TirageOverviewComponent,
    ParticipantsListComponent,
  ],
  templateUrl: './manage-participants.component.html',
  styleUrl: './manage-participants.component.css',
})
export class ManageParticipantsComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  tirage!: LotteryOverviewResponse;
  participants!: Participants;
  // Pagination
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 0;
  paginatedParticipants: Participants = [];
  searchTerm = '';
  idTirage: number | null = null;

  constructor(
    private adminService: AdminSharedService,
    private manageParticipantsService: ManageParticipantsService,
  ) {}

  ngOnInit(): void {
    const idNullable = this.activatedRoute.snapshot.paramMap.get('id');
    if (idNullable) {
      this.idTirage = +idNullable;
      this.loadTirage(this.idTirage);
      this.loadParticipants(this.idTirage);
    }
  }

  loadTirage(id: number): void {
    this.adminService.getTirageDetails(id).subscribe({
      next: (data) => {
        this.tirage = data.data;
      },
      error: (err) => {},
    });
  }

  loadParticipants(id: number): void {
    this.manageParticipantsService.getParticipants(id).subscribe({
      next: (data) => {
        this.participants = data.data;
      },
      error: (err) => {},
    });
  }

  onUpdate(): void {
    if (this.idTirage) {
      this.loadTirage(this.idTirage);
      this.loadParticipants(this.idTirage);
    }
  }
}
