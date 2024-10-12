/**
 * Interface pour la réponse à une demande d'enregistrement de loterie.
 */
export interface LotteryRegistryResponse {
  /**
   * Message de confirmation indiquant que l'enregistrement a été effectué avec succès.
   * @type {string}
   */
  message: string;
}

/**
 * Interface pour les erreurs rencontrées lors de l'enregistrement d'une loterie.
 */
export interface LotteryRegistryError {
  /**
   * Message d'erreur indiquant le problème survenu lors de l'enregistrement.
   * @type {string}
   */
  message: string;

  /**
   * Indique si des erreurs ont eu lieu lors de la tentative d'enregistrement.
   * @type {boolean}
   */
  errors: boolean;

  /**
   * Détails supplémentaires concernant les erreurs, incluant des erreurs spécifiques pour chaque champ.
   * @type {object}
   * @optional
   */
  details?: {
    /**
     * Liste des erreurs concernant les numéros choisis.
     * @type {string[]}
     * @optional
     */
    numbers?: string[];

    /**
     * Liste des erreurs concernant les numéros chanceux choisis.
     * @type {string[]}
     * @optional
     */
    lucky_numbers?: string[];

    /**
     * Permet d'ajouter d'autres erreurs éventuelles sous forme de clé/valeur.
     * @type {any}
     */
    [key: string]: any;
  };
}

/**
 * Interface pour les données nécessaires à l'enregistrement d'une loterie.
 */
export interface LotteryRegistryData {
  /**
   * Identifiant unique de la loterie à laquelle les numéros sont associés.
   * @type {number}
   */
  lottery_id: number;

  /**
   * Numéros choisis par l'utilisateur pour la loterie.
   * @type {string}
   */
  numbers: string;

  /**
   * Numéros chanceux choisis par l'utilisateur pour la loterie.
   * @type {string}
   */
  lucky_numbers: string;
}
