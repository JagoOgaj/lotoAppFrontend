import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-participants-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './participants-list.component.html',
  styleUrl: './participants-list.component.css',
})
export class ParticipantsListComponent implements OnInit {
  @Input() tirage!: {
    nom: string;
    recompense: string;
    nombreParticipants: number;
    nombreParticipantsMax: number;
    status: string;
    dateTirage: Date;
    dateFin: Date;
  };
  @Input() participants!:
    | { nom: string; email: string; numero: string }[]
    | null;
  @Input() paginatedParticipants: any[] = [];
  @Input() searchTerm: string = '';
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 0;
  @Input() itemsPerPage: number = 5;
  newUser = { nom: '', email: '', numero: '' };
  pages: number[] = [];
  selectedUser: any;

  ngOnInit(): void {
    this.updatePagination();
  }

  removeUser(participant: any) {
    this.selectedUser = participant;
  }

  setSelectedUser(participant: any) {
    this.selectedUser = participant;
  }

  filterParticipants() {
    this.currentPage = 1;
    this.updatePagination();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

  updatePagination() {
    if (this.participants === null) {
      this.participants = [];
    }

    const filtered = this.participants.filter((participant) =>
      participant.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);

    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    }

    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedParticipants = filtered.slice(
      start,
      start + this.itemsPerPage
    );

    this.pages = Array.from({ length: this.totalPages }, (v, i) => i + 1);
  }

  addUser() {
    if (this.participants === null) {
      this.participants = [];
    }

    // Vérification si le nombre de participants n'a pas dépassé le maximum autorisé
    if (this.participants.length < this.tirage!.nombreParticipantsMax) {
      // Ajouter le nouvel utilisateur à la liste des participants
      this.participants.push({ ...this.newUser });
      this.tirage!.nombreParticipants++;

      // Réinitialiser le formulaire du nouvel utilisateur
      this.newUser = { nom: '', email: '', numero: '' };

      // Mettre à jour la pagination
      this.totalPages = Math.ceil(this.participants.length / this.itemsPerPage);

      // Bascule directement à la dernière page (où le nouvel utilisateur sera affiché)
      this.currentPage = this.totalPages;

      // Mettre à jour les participants paginés
      this.updatePagination();
    } else {
      alert('Le nombre maximum de participants est atteint.');
    }
  }

  confirmDelete() {
    if (this.selectedUser && this.participants) {
      this.participants = this.participants.filter(
        (p: any) => p !== this.selectedUser
      );
      this.tirage!.nombreParticipants--;
      this.updatePagination();
      this.selectedUser = null;
    }
  }
}
