import { Component, OnInit } from '@angular/core';
import { DrawRanks } from '../../../constants/ressources/admin/LotteryInfoRessource';
import { TirageResultService } from './service/tirage-result.service';
import { ActivatedRoute } from '@angular/router';
import { LotteryOverviewResponse } from '../../../constants/ressources/user/tirageUserRessource';
import { AdminSharedService } from '../service/admin-shared.service';
import { CommonModule } from '@angular/common';
import confetti from 'canvas-confetti';

/**
 * Composant pour afficher les résultats d'un tirage.
 *
 * @component TirageResultComponent
 */
@Component({
  selector: 'app-tirage-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tirage-result.component.html',
  styleUrl: './tirage-result.component.css',
})
export class TirageResultComponent implements OnInit {
  ranking: DrawRanks | null = null;
  lotteryInfo: LotteryOverviewResponse | null = null;
  currentPage = 1;
  itemsPerPage = 10;
  winning_numbers: string | undefined = '';
  lucky_numbers: string | undefined = '';

  /**
   * Constructeur du composant.
   *
   * @param {TirageResultService} tirageResultService - Service pour récupérer les résultats des tirages.
   * @param {ActivatedRoute} activatedRoute - Route active pour récupérer les paramètres.
   * @param {AdminSharedService} tirageDetailsAdmin - Service partagé pour récupérer les détails du tirage.
   */
  constructor(
    private tirageResultService: TirageResultService,
    private activatedRoute: ActivatedRoute,
    private tirageDetailsAdmin: AdminSharedService,
  ) {}

  /**
   * Méthode de cycle de vie appelée lors de l'initialisation du composant.
   * Elle récupère l'identifiant du tirage à partir des paramètres de l'URL,
   * puis charge les classements et les détails associés à cet identifiant.
   * Une fois les données chargées, elle déclenche une animation de célébration après un délai de 3 secondes.
   */
  ngOnInit(): void {
    const idNullable = this.activatedRoute.snapshot.paramMap.get('id');
    if (idNullable) {
      this.loadRank(+idNullable);
      this.loadDetails(+idNullable);
      setTimeout(() => {
        this.celebrate();
      }, 2000);
    }
  }

  /**
   * Récupère les joueurs paginés pour l'affichage.
   *
   * @returns {DrawRanks | null} - Les joueurs paginés ou null si aucune donnée.
   */
  getPaginatedPlayers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = this.currentPage * this.itemsPerPage;
    return this.ranking?.slice(startIndex, endIndex);
  }

  /**
   * Calcule le nombre total de pages pour la pagination.
   *
   * @returns {number} - Nombre total de pages.
   */
  get totalPages() {
    return Math.ceil(this.ranking!.length / this.itemsPerPage);
  }

  /**
   * Crée un tableau des numéros de pages pour la pagination.
   *
   * @returns {number[]} - Tableau des numéros de pages.
   */
  getTotalPagesArray() {
    return Array(this.totalPages)
      .fill(0)
      .map((_, i) => i + 1);
  }

  /**
   * Change la page actuelle pour la pagination.
   *
   * @param {number} page - Le numéro de la page à afficher.
   */
  goToPage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  /**
   * Arrondit le montant des gains à deux décimales si nécessaire.
   *
   * @param {number} number - Le montant à arrondir.
   * @returns {number} - Le montant arrondi.
   */
  roundReward(number: number): number {
    if (Number.isInteger(number)) {
      return number;
    }
    return parseFloat(number.toFixed(2));
  }

  /**
   * Charge le classement d'un tirage par son identifiant.
   *
   * @param {number} id - L'identifiant du tirage.
   */
  loadRank(id: number): void {
    this.tirageResultService.getRank(id).subscribe({
      next: (response) => {
        this.ranking = response.data;
      },
      error: (error) => {},
    });
  }

  /**
   * Charge les détails d'un tirage par son identifiant.
   *
   * @param {number} id - L'identifiant du tirage.
   */
  loadDetails(id: number): void {
    this.tirageDetailsAdmin.getTirageDetails(id).subscribe({
      next: (response) => {
        this.lotteryInfo = response.data;
        this.winning_numbers = response.numbers?.winning_numbers;
        this.lucky_numbers = response.numbers?.lucky_numbers;
      },
      error: (err) => {},
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
}
