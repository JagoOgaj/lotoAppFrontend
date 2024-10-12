import {
  LotteryOverviewResponse,
  LotteryResultReponse,
} from './tirageUserRessource';

/**
 * Interface pour la réponse contenant des informations sur une loterie.
 */
export interface LotteryInfoResponse {
  /**
   * Message de confirmation ou d'information concernant la loterie.
   * @type {string}
   */
  message: string;

  /**
   * Données détaillées sur la loterie.
   * @type {LotteryOverviewResponse}
   */
  data: LotteryOverviewResponse;

  /**
   * Résultats de la loterie, incluant les numéros gagnants.
   * @type {LotteryResultReponse}
   */
  numbers: LotteryResultReponse;
}

/**
 * Interface pour les erreurs rencontrées lors de la récupération des informations de la loterie.
 */
export interface LotteryInfoErreur {
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
   * Détails supplémentaires concernant les erreurs, décrivant la nature des problèmes rencontrés.
   * @type {string}
   * @optional
   */
  details?: string;
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
 * Interface pour la réponse contenant les informations de classement des loteries.
 */
export interface LotteryInfoRankResponse {
  /**
   * Message de confirmation ou d'information concernant la requête de classement.
   * @type {string}
   */
  message: string;

  /**
   * Données contenant les classements des tirages.
   * @type {DrawRanks}
   */
  data: DrawRanks;

  /**
   * Informations sur le classement du participant courant.
   * @type {DrawRank}
   */
  currentUser: DrawRank;
}

/**
 * Interface pour les erreurs rencontrées lors de la récupération des informations de classement des loteries.
 */
export interface LotteryInfoRankError {
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
   * Détails supplémentaires concernant les erreurs, décrivant la nature des problèmes rencontrés.
   * @type {string}
   * @optional
   */
  details?: string;
}
