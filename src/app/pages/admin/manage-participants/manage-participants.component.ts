import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TirageOverviewComponent } from '../../../shared/admin/tirage-overview/tirage-overview.component';
import { ParticipantsListComponent } from '../../../shared/admin/participants-list/participants-list.component';

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
export class ManageParticipantsComponent {
  tirage: {
    nom: string;
    recompense: string;
    nombreParticipants: number;
    nombreParticipantsMax: number;
    status: string;
    dateTirage: Date;
    dateFin: Date;
  } | null = null;

  participants: { nom: string; email: string; numero: string }[] | null = null;

  // Pagination
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 0;
  paginatedParticipants: any[] = [];
  searchTerm = '';

  constructor() {
    this.participants = [
      { nom: 'Jean Dupont', email: 'test@test.fr', numero: '12345' },
      { nom: 'Marie Martin', email: 'test@test.fr', numero: '67890' },
      { nom: 'Paul Durand', email: 'test@test.fr', numero: '54321' },
      { nom: 'Alice Bernard', email: 'test@test.fr', numero: '98765' },
      { nom: 'Sophie Lefevre', email: 'test@test.fr', numero: '11111' },
      { nom: 'Marc Dupuis', email: 'test@test.fr', numero: '22222' },
      { nom: 'Lucie Moreau', email: 'test@test.fr', numero: '33333' },
      { nom: 'Julien Petit', email: 'test@test.fr', numero: '44444' },
      { nom: 'Claire Roux', email: 'test@test.fr', numero: '55555' },
      { nom: 'Thomas Morel', email: 'test@test.fr', numero: '66666' },
      { nom: 'Nathalie Dubois', email: 'test@test.fr', numero: '77777' },
      { nom: 'François Lemoine', email: 'test@test.fr', numero: '88888' },
      { nom: 'Emilie Lefebvre', email: 'test@test.fr', numero: '99999' },
      { nom: 'Hugo Caron', email: 'test@test.fr', numero: '10101' },
      { nom: 'Chloé Girard', email: 'test@test.fr', numero: '20202' },
      { nom: 'Léo Robert', email: 'test@test.fr', numero: '30303' },
      { nom: 'Zoé Lambert', email: 'test@test.fr', numero: '40404' },
      { nom: 'Gabriel Fontaine', email: 'test@test.fr', numero: '50505' },
      { nom: 'Inès Simon', email: 'test@test.fr', numero: '60606' },
      { nom: 'Lucas Lambert', email: 'test@test.fr', numero: '70707' },
      { nom: 'Emma Delahaye', email: 'test@test.fr', numero: '80808' },
    ];

    this.tirage = {
      nom: 'Tirage Loto',
      recompense: '5000€',
      nombreParticipants: this.participants.length, // Initialisé à 0
      nombreParticipantsMax: 1000,
      status: 'En cours',
      dateTirage: new Date(),
      dateFin: new Date(new Date().setDate(new Date().getDate() + 7)),
    };
  }
}
