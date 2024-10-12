import {
  LotteriesOverviewResponse,
  LotteryOverviewResponse,
} from '../user/tirageUserRessource';

/**
 * Interface pour la réponse contenant les informations d'une loterie pour un administrateur.
 */
export interface LotteryInfoAdminResponse {
  /**
   * Message de confirmation ou d'information concernant la requête.
   * @type {string}
   */
  message: string;

  /**
   * Informations détaillées sur la loterie.
   * @type {LotteryOverviewResponse}
   */
  data: LotteryOverviewResponse;

  /**
   * Numéros gagnants et numéros chanceux associés à la loterie.
   * @type {object}
   * @optional
   */
  numbers?: {
    /**
     * Numéros gagnants pour la loterie, sous forme de chaîne.
     * @type {string}
     */
    winning_numbers: string;

    /**
     * Numéros chanceux pour la loterie, sous forme de chaîne.
     * @type {string}
     */
    lucky_numbers: string;
  };
}

/**
 * Interface pour les erreurs lors de la récupération des informations d'une loterie pour un administrateur.
 */
export interface LotteryInfoAdminErreur {
  /**
   * Message d'erreur indiquant le problème survenu.
   * @type {string}
   */
  message: string;

  /**
   * Indique si des erreurs ont eu lieu lors de la requête.
   * @type {boolean}
   */
  errors: boolean;

  /**
   * Détails supplémentaires concernant les erreurs, sous forme de chaîne.
   * @type {string}
   * @optional
   */
  details?: string;
}

/**
 * Interface pour la réponse contenant toutes les loteries.
 */
export interface AllLotteryResponse {
  /**
   * Message de confirmation ou d'information concernant la requête.
   * @type {string}
   */
  message: string;

  /**
   * Données contenant les informations sur toutes les loteries.
   * @type {LotteriesOverviewResponse}
   */
  data: LotteriesOverviewResponse;
}

/**
 * Interface pour les erreurs lors de la récupération de toutes les loteries.
 */
export interface AllLotteryError {
  /**
   * Message d'erreur indiquant le problème survenu.
   * @type {string}
   */
  message: string;

  /**
   * Indique si des erreurs ont eu lieu lors de la requête.
   * @type {boolean}
   */
  errors: boolean;

  /**
   * Détails supplémentaires concernant les erreurs, sous forme de tableau de chaînes.
   * @type {string[]}
   * @optional
   */
  details?: string[];
}

/**
 * Interface pour les informations de classement d'un tirage.
 */
export interface DrawRank {
  /**
   * Classement du participant.
   * @type {number}
   */
  rank: number;

  /**
   * Nom du participant.
   * @type {string}
   */
  name: string;

  /**
   * Score du participant.
   * @type {number}
   */
  score: number;

  /**
   * Montant des gains du participant.
   * @type {number}
   */
  winnings: number;
}

/**
 * Type représentant une liste d'informations de classement de tirages.
 * @type {DrawRank[]}
 */
export type DrawRanks = DrawRank[];

/**
 * Interface pour la réponse contenant les informations de classement des loteries pour un administrateur.
 */
export interface AdminLotteryInfoRankResponse {
  /**
   * Message de confirmation ou d'information concernant la requête.
   * @type {string}
   */
  message: string;

  /**
   * Données contenant les classements des tirages.
   * @type {DrawRanks}
   */
  data: DrawRanks;
}

/**
 * Interface pour les erreurs lors de la récupération des informations de classement des loteries pour un administrateur.
 */
export interface AdminLotteryInfoRankError {
  /**
   * Message d'erreur indiquant le problème survenu.
   * @type {string}
   */
  message: string;

  /**
   * Indique si des erreurs ont eu lieu lors de la requête.
   * @type {boolean}
   */
  errors: boolean;

  /**
   * Détails supplémentaires concernant les erreurs, sous forme de chaîne.
   * @type {string}
   * @optional
   */
  details?: string;
}
