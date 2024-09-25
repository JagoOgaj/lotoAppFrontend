import { Component } from '@angular/core';
import { TirageListSharedComponent } from '../../../shared/admin/tirage-list-shared/tirage-list-shared.component';

@Component({
  selector: 'app-tirage-list',
  standalone: true,
  imports: [TirageListSharedComponent],
  templateUrl: './tirage-list.component.html',
  styleUrl: './tirage-list.component.css',
})
export class TirageListComponent {
  tirages: {
    nom: string;
    recompense: string;
    nombreParticipants: number;
    nombreParticipantsMax: number;
    status: string;
    dateTirage: Date;
    dateFin: Date;
  }[] = [
    {
      nom: 'Tirage Loto1',
      recompense: '5000€',
      nombreParticipants: 20, // Initialisé à 0
      nombreParticipantsMax: 20,
      status: 'Terminé',
      dateTirage: new Date(),
      dateFin: new Date(new Date().setDate(new Date().getDate() + 10)),
    },
    {
      nom: 'Tirage Loto2',
      recompense: '5000€',
      nombreParticipants: 40, // Initialisé à 0
      nombreParticipantsMax: 20,
      status: 'En cours',
      dateTirage: new Date(),
      dateFin: new Date(new Date().setDate(new Date().getDate() + 7)),
    },
    {
      nom: 'Tirage Loto3',
      recompense: '5000€',
      nombreParticipants: 60, // Initialisé à 0
      nombreParticipantsMax: 20,
      status: 'En cours',
      dateTirage: new Date(),
      dateFin: new Date(new Date().setDate(new Date().getDate() + 7)),
    },
    {
      nom: 'Tirage Loto3',
      recompense: '5000€',
      nombreParticipants: 60, // Initialisé à 0
      nombreParticipantsMax: 20,
      status: 'En cours',
      dateTirage: new Date(),
      dateFin: new Date(new Date().setDate(new Date().getDate() + 7)),
    },
    {
      nom: 'Tirage Loto3',
      recompense: '5000€',
      nombreParticipants: 60, // Initialisé à 0
      nombreParticipantsMax: 20,
      status: 'En cours',
      dateTirage: new Date(),
      dateFin: new Date(new Date().setDate(new Date().getDate() + 7)),
    },
    {
      nom: 'Tirage Loto3',
      recompense: '5000€',
      nombreParticipants: 60, // Initialisé à 0
      nombreParticipantsMax: 20,
      status: 'En cours',
      dateTirage: new Date(),
      dateFin: new Date(new Date().setDate(new Date().getDate() + 7)),
    },
    {
      nom: 'Tirage Loto3',
      recompense: '5000€',
      nombreParticipants: 60, // Initialisé à 0
      nombreParticipantsMax: 20,
      status: 'En cours',
      dateTirage: new Date(),
      dateFin: new Date(new Date().setDate(new Date().getDate() + 7)),
    },
    {
      nom: 'Tirage Loto3',
      recompense: '5000€',
      nombreParticipants: 60, // Initialisé à 0
      nombreParticipantsMax: 20,
      status: 'En cours',
      dateTirage: new Date(),
      dateFin: new Date(new Date().setDate(new Date().getDate() + 7)),
    },
  ];
}
