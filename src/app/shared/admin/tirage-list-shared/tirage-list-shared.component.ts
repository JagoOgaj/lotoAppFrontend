import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TirageOverviewComponent } from '../tirage-overview/tirage-overview.component';

@Component({
  selector: 'app-tirage-list-shared',
  standalone: true,
  imports: [CommonModule, FormsModule, TirageOverviewComponent],
  templateUrl: './tirage-list-shared.component.html',
  styleUrl: './tirage-list-shared.component.css',
})
export class TirageListSharedComponent {
  @Input() tirages!: {
    nom: string;
    recompense: string;
    nombreParticipants: number;
    nombreParticipantsMax: number;
    status: string;
    dateTirage: Date;
    dateFin: Date;
  }[];

  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalPages: number = 0;
  paginatedTirages: any[] = [];
  pages: number[] = [];
  startDate!: Date;
  endDate!: Date;
  statusFilter: string = '';
  tirageToDelete: any;
  newTirage: any = {
    nom: '',
    recompense: '',
    nombreParticipantsMax: 0,
    dateTirage: '',
    dateFin: '',
  };

  ngOnInit(): void {
    this.updatePagination();
  }

  updatePagination() {
    if (!this.tirages) {
      this.tirages = [];
    }

    this.filterTirages();

    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }

    this.paginatedTirages = this.tirages.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }

  filterTirages() {
    let filtered = this.tirages.filter((tirage) =>
      tirage.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    if (this.statusFilter) {
      filtered = filtered.filter(
        (tirage) => tirage.status === this.statusFilter
      );
    }

    if (this.startDate) {
      const startDate = new Date(this.startDate);
      filtered = filtered.filter((tirage) => {
        const tirageDate = new Date(tirage.dateTirage);
        return (
          tirageDate.getFullYear() === startDate.getFullYear() &&
          tirageDate.getMonth() === startDate.getMonth() &&
          tirageDate.getDate() === startDate.getDate()
        );
      });
    }
    if (this.endDate) {
      const endDate = new Date(this.endDate);
      filtered = filtered.filter((tirage) => {
        const tirageEndDate = new Date(tirage.dateFin);
        return (
          tirageEndDate.getFullYear() === endDate.getFullYear() &&
          tirageEndDate.getMonth() === endDate.getMonth() &&
          tirageEndDate.getDate() === endDate.getDate()
        );
      });
    }

    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);

    this.paginatedTirages = filtered.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
    this.pages = Array.from({ length: this.totalPages }, (v, i) => i + 1);
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

  viewDetails(tirage: any) {
    // Ici, redirection vers tirage-details/:id
  }

  confirmDelete(tirage: any) {
    this.tirageToDelete = tirage;
  }

  deleteTirage() {
    if (this.tirageToDelete) {
      this.tirages = this.tirages.filter(
        (tirage) => tirage !== this.tirageToDelete
      );
      this.tirageToDelete = null; // Réinitialiser la variable

      this.updatePagination();

      if (this.currentPage > this.totalPages && this.totalPages > 0) {
        this.currentPage = this.totalPages;
        this.updatePagination();
      }
    }
  }

  createTirage() {
    if (
      this.newTirage.nom &&
      this.newTirage.recompense &&
      this.newTirage.nombreParticipantsMax > 0
    ) {
      this.tirages.push({
        ...this.newTirage,
        status: 'En cours',
        nombreParticipants: 0,
      });
      this.newTirage = {
        nom: '',
        recompense: '',
        nombreParticipantsMax: 0,
        dateTirage: '',
        dateFin: '',
      };
      this.updatePagination();
      this.currentPage = this.totalPages;
      this.updatePagination();
    }
  }
}
