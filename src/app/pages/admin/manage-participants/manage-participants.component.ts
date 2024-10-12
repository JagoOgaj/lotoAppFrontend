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

/**
 * Composant pour gérer les participants d'un tirage.
 *
 * Ce composant est responsable de l'affichage des détails d'un tirage et de la liste des participants associés.
 */
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
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 0;
  paginatedParticipants: Participants = [];
  searchTerm = '';
  idTirage: number | null = null;

  /**
   * Constructeur du composant ManageParticipantsComponent.
   *
   * @param {AdminSharedService} adminService - Service pour gérer les opérations liées à l'administration.
   * @param {ManageParticipantsService} manageParticipantsService - Service pour gérer les participants.
   */
  constructor(
    private adminService: AdminSharedService,
    private manageParticipantsService: ManageParticipantsService,
  ) {}

  /**
   * Méthode appelée lors de l'initialisation du composant.
   * Récupère l'identifiant du tirage et charge les détails du tirage ainsi que les participants.
   */
  ngOnInit(): void {
    const idNullable = this.activatedRoute.snapshot.paramMap.get('id');
    if (idNullable) {
      this.idTirage = +idNullable;
      this.loadTirage(this.idTirage);
      this.loadParticipants(this.idTirage);
    }
  }

  /**
   * Charge les détails d'un tirage en fonction de son identifiant.
   *
   * @param {number} id - Identifiant du tirage à charger.
   */
  loadTirage(id: number): void {
    this.adminService.getTirageDetails(id).subscribe({
      next: (data) => {
        this.tirage = data.data;
      },
      error: (err) => {},
    });
  }

  /**
   * Charge la liste des participants en fonction de l'identifiant du tirage.
   *
   * @param {number} id - Identifiant du tirage pour récupérer les participants.
   */
  loadParticipants(id: number): void {
    this.manageParticipantsService.getParticipants(id).subscribe({
      next: (data) => {
        this.participants = data.data;
      },
      error: (err) => {},
    });
  }

  /**
   * Met à jour les détails du tirage et la liste des participants.
   * Appelée lors d'une mise à jour.
   */
  onUpdate(): void {
    if (this.idTirage) {
      this.loadTirage(this.idTirage);
      this.loadParticipants(this.idTirage);
    }
  }
}
