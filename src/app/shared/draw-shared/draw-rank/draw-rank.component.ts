import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  DrawRank,
  DrawRanks,
  LotteryInfoRankResponse,
} from '../../../constants/ressources/user/LotteryInfoRessource';
import { ActivatedRoute } from '@angular/router';
import { DrawRankService } from './service/draw-rank.service';

/**
 * Composant pour afficher le classement des joueurs d'un tirage au sort.
 *
 * @component
 */
@Component({
  selector: 'app-draw-rank',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './draw-rank.component.html',
  styleUrl: './draw-rank.component.css',
})
export class DrawRankComponent implements OnInit {
  players: DrawRanks = [];
  currentUser: DrawRank | undefined;
  currentPage = 1;
  itemsPerPage = 10;

  /**
   * Constructeur du composant.
   *
   * @param {ActivatedRoute} activatedRoute - Service pour récupérer les paramètres de l'URL.
   * @param {DrawRankService} drawRankService - Service pour récupérer les classements des tirages.
   */
  constructor(
    private activatedRoute: ActivatedRoute,
    private drawRankService: DrawRankService,
  ) {}

  /**
   * Méthode appelée lors de l'initialisation du composant.
   * Elle charge le classement si un ID est présent dans l'URL.
   */
  ngOnInit(): void {
    const idNullable = this.activatedRoute.snapshot.paramMap.get('id');
    if (idNullable) {
      this.loadRank(+idNullable);
    }
  }

  /**
   * Récupère les joueurs paginés pour l'affichage.
   *
   * @returns {DrawRanks} - Liste des joueurs pour la page actuelle.
   */
  getPaginatedPlayers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = this.currentPage * this.itemsPerPage;
    return this.players.slice(startIndex, endIndex);
  }

  /**
   * Calcule le nombre total de pages pour la pagination.
   *
   * @returns {number} - Nombre total de pages.
   */
  get totalPages() {
    return Math.ceil(this.players.length / this.itemsPerPage);
  }

  /**
   * Récupère un tableau contenant les numéros de page pour la pagination.
   *
   * @returns {number[]} - Tableau des numéros de page.
   */
  getTotalPagesArray() {
    return Array(this.totalPages)
      .fill(0)
      .map((_, i) => i + 1);
  }

  /**
   * Va à une page spécifique de la pagination.
   *
   * @param {number} page - Numéro de la page à laquelle aller.
   */
  goToPage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  /**
   * Vérifie si l'utilisateur actuel se trouve sur la page actuelle.
   *
   * @returns {boolean} - Vrai si l'utilisateur actuel est sur la page actuelle, sinon faux.
   */
  isCurrentUserOnCurrentPage() {
    return this.getPaginatedPlayers().some(
      (player) => player.name === this.currentUser?.name,
    );
  }

  /**
   * Arrondit une récompense à deux décimales si ce n'est pas un entier.
   *
   * @param {number} number - Le nombre à arrondir.
   * @returns {number} - Le nombre arrondi.
   */
  roundReward(number: number): number {
    if (Number.isInteger(number)) {
      return number;
    }
    return parseFloat(number.toFixed(2));
  }

  /**
   * Charge le classement des joueurs pour un tirage spécifique.
   *
   * @param {number} id - L'ID du tirage pour lequel charger le classement.
   */
  loadRank(id: number): void {
    this.drawRankService.getRankTirage(id).subscribe({
      next: (response) => {
        this.players = response.data;
        this.currentUser = response.currentUser;
      },
      error: (error) => {},
    });
  }
}
