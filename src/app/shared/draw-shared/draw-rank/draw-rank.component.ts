import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  DrawRank,
  DrawRanks,
} from '../../../constants/ressources/user/LotteryInfoRessource';
import { ActivatedRoute } from '@angular/router';
import { DrawRankService } from './service/draw-rank.service';
import confetti from 'canvas-confetti';

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
  tirageId: number = -1;

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
   *
   * Cette méthode effectue les actions suivantes :
   * 1. Récupère l'ID à partir des paramètres de l'URL.
   * 2. Si un ID est présent, elle charge le classement correspondant à cet ID.
   * 3. Si l'utilisateur actuel est défini, elle appelle la méthode `celebrate()` après un délai de 3000 millisecondes (3 secondes).
   *
   * @returns {void} Cette méthode ne retourne rien.
   */
  ngOnInit(): void {
    const idNullable = this.activatedRoute.snapshot.paramMap.get('id');
    if (idNullable) {
      this.tirageId = +idNullable;
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
        if (this.currentUser.winnings > 0) {
          setTimeout(() => {
            this.celebrate();
          }, 2000);
        }
      },
      error: (error) => {},
    });
  }

  /**
   * Affiche des confettis à l'écran.
   *
   * Cette méthode déclenche l'animation des confettis à gauche et à droite de l'écran.
   *
   * Elle exécute les étapes suivantes :
   * 1. Affiche 100 confettis au centre gauche de l'écran avec un étalement de 160 degrés.
   * 2. Affiche 100 confettis au centre droit de l'écran avec un étalement de 160 degrés.
   * 3. Après un délai de 3000 millisecondes (3 secondes), affiche à nouveau 100 confettis au centre de l'écran avec un étalement de 160 degrés.
   *
   * @returns {void} Cette méthode ne retourne rien.
   */
  celebrate(): void {
    const duration = 3000;

    confetti({
      particleCount: 100,
      spread: 160,
      origin: { x: 0, y: 0.6 },
    });

    confetti({
      particleCount: 100,
      spread: 160,
      origin: { x: 1, y: 0.6 },
    });

    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 160,
        origin: { y: 0.6 },
      });
    }, duration);
  }

  /**
   * Télécharge le PDF de récompense pour un utilisateur spécifique.
   *
   * Cette méthode appelle le service pour obtenir le PDF de récompense
   * correspondant à l'identifiant de l'utilisateur. Une fois le blob
   * reçu, elle crée un lien pour permettre le téléchargement du fichier
   * PDF. En cas d'erreur lors de la récupération du PDF, un message
   * d'erreur est enregistré dans la console.
   *
   * @param {number} userId - L'identifiant de l'utilisateur pour lequel le PDF de récompense doit être téléchargé.
   * @returns {void} - Cette méthode ne retourne rien.
   *
   * @example
   * // Exemple d'utilisation
   * downloadPdf(123);
   */
  downloadPdf(userId: number) {
    this.drawRankService.getRewardPdf(userId).subscribe(
      (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `recompense_${this.currentUser?.name}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Erreur lors du téléchargement du PDF', error);
      },
    );
  }
}
