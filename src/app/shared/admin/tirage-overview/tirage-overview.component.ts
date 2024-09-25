import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tirage-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tirage-overview.component.html',
  styleUrl: './tirage-overview.component.css',
})
export class TirageOverviewComponent {
  @Input() tirage!: {
    nom: string;
    recompense: string;
    nombreParticipants: number;
    nombreParticipantsMax: number;
    status: string;
    dateTirage: Date;
    dateFin: Date;
  };

  showDetails() {
    console.log('Détails du tirage:', this.tirage); // rediriger vers tirage-details/:id
  }
}
