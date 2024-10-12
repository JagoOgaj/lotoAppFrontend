/**
 * Interface pour la réponse contenant un aperçu d'une loterie.
 */
export interface LotteryOverviewResponse {
  /**
   * Identifiant unique de la loterie.
   * @type {number}
   */
  id: number;

  /**
   * Nom de la loterie.
   * @type {string}
   */
  name: string;

  /**
   * Date de début de la loterie, au format ISO 8601.
   * @type {string}
   * @optional
   */
  start_date?: string;

  /**
   * Date de fin de la loterie, au format ISO 8601.
   * @type {string}
   * @optional
   */
  end_date?: string;

  /**
   * Statut de la loterie (ex: active, terminée, annulée).
   * @type {string}
   */
  status: string;

  /**
   * Montant du prix à gagner pour cette loterie.
   * @type {number}
   */
  reward_price: number;

  /**
   * Nombre maximum de participants autorisés à cette loterie.
   * @type {number}
   */
  max_participants: number;

  /**
   * Nombre actuel de participants inscrits à cette loterie.
   * @type {number}
   */
  participant_count: number;
}

/**
 * Interface pour les résultats d'une loterie, incluant les numéros gagnants.
 */
export interface LotteryResultReponse {
  /**
   * Numéros gagnants pour la loterie, séparés par des virgules.
   * @type {string}
   */
  winning_numbers: string;

  /**
   * Numéros chanceux pour la loterie, séparés par des virgules.
   * @type {string}
   */
  lucky_numbers: string;
}

/**
 * Type représentant une liste d'aperçus de loteries.
 * @type {LotteryOverviewResponse[]}
 */
export type LotteriesOverviewResponse = LotteryOverviewResponse[];

/**
 * Interface pour les erreurs rencontrées lors de la récupération d'aperçus de loteries.
 */
export interface LotteryOverviewError {
  /**
   * Indique si des erreurs ont eu lieu lors de la requête.
   * @type {boolean}
   */
  errors: boolean;

  /**
   * Message d'erreur indiquant le problème survenu lors de la requête.
   * @type {string}
   */
  message: string;
}

/**
 * Interface pour l'historique d'une loterie.
 */
export interface LotteryHistory {
  /**
   * Identifiant unique de la loterie dans l'historique.
   * @type {number}
   */
  id: number;

  /**
   * Nom de la loterie.
   * @type {string}
   */
  name: string;

  /**
   * Date à laquelle la loterie a eu lieu.
   * @type {string}
   */
  date: string;

  /**
   * Statut de la loterie (ex: terminée, annulée).
   * @type {string}
   */
  statut: string;

  /**
   * Numéros joués par les participants lors de cette loterie, séparés par des virgules.
   * @type {string}
   */
  numerosJoues: string;

  /**
   * Numéros chanceux qui ont été tirés lors de cette loterie, séparés par des virgules.
   * @type {string}
   */
  numerosChance: string;

  /**
   * Date du tirage des résultats, au format ISO 8601.
   * @type {string}
   */
  dateTirage: string;
}

/**
 * Interface pour la réponse contenant l'historique des loteries.
 */
export interface LotteryHistoryResonse {
  /**
   * Message de confirmation ou d'information concernant la requête d'historique.
   * @type {string}
   */
  message: string;

  /**
   * Liste des historiques de loteries.
   * @type {LotteryHistory[]}
   */
  data: LotteryHistory[];
}

/**
 * Interface pour les erreurs rencontrées lors de la récupération de l'historique des loteries.
 */
export interface LotteryHistoryErrors {
  /**
   * Message d'erreur indiquant le problème survenu lors de la requête d'historique.
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

  /**
   * Indique si la réponse ne contient aucune entrée (historique vide).
   * @type {boolean}
   * @optional
   */
  emptyEntries?: boolean;
}

/**
 * Type représentant une liste d'historiques de loteries.
 * @type {LotteryHistory[]}
 */
export type LotteryHistories = LotteryHistory[];
