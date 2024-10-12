/**
 * Interface pour la mise à jour des informations d'une loterie.
 */
export interface UpdateLottery {
  /**
   * Nom de la loterie à mettre à jour.
   * @type {string}
   * @optional
   */
  name?: string;

  /**
   * Date de début de la loterie.
   * @type {string}
   * @optional
   */
  start_date?: string;

  /**
   * Date de fin de la loterie.
   * @type {string}
   * @optional
   */
  end_date?: string;

  /**
   * Statut de la loterie (ex: "active", "terminée", etc.).
   * @type {string}
   * @optional
   */
  status?: string;

  /**
   * Nombre maximum de participants autorisés dans la loterie.
   * @type {number}
   * @optional
   */
  max_participants?: number;
}

/**
 * Interface pour la réponse à la mise à jour d'une loterie.
 */
export interface UpdateLotteryResponse {
  /**
   * Message de confirmation ou d'information concernant la mise à jour de la loterie.
   * @type {string}
   */
  message: string;
}

/**
 * Interface pour les erreurs lors de la mise à jour d'une loterie.
 */
export interface UpdateLotteryError {
  /**
   * Message d'erreur indiquant le problème survenu lors de la mise à jour.
   * @type {string}
   */
  message: string;

  /**
   * Indique si des erreurs ont eu lieu lors de la mise à jour.
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
     * Liste des erreurs concernant le champ 'name'.
     * @type {string[]}
     * @optional
     */
    name?: string[];

    /**
     * Liste des erreurs concernant le champ 'start_date'.
     * @type {string[]}
     * @optional
     */
    start_date?: string[];

    /**
     * Liste des erreurs concernant le champ 'end_date'.
     * @type {string[]}
     * @optional
     */
    end_date?: string[];

    /**
     * Liste des erreurs concernant le champ 'status'.
     * @type {string[]}
     * @optional
     */
    status?: string[];

    /**
     * Liste des erreurs concernant le champ 'max_participants'.
     * @type {string[]}
     * @optional
     */
    max_participants?: string[];

    /**
     * Permet d'ajouter d'autres erreurs qui ne sont pas explicitement mentionnées.
     * @type {string[] | undefined}
     */
    [key: string]: string[] | undefined;
  };
}

/**
 * Interface pour la réponse à la mise à jour d'une loterie vers l'état "terminée".
 */
export interface UpdateLotteryToDoneResponse {
  /**
   * Message de confirmation ou d'information concernant la mise à jour de l'état de la loterie.
   * @type {string}
   */
  message: string;
}

/**
 * Interface pour les erreurs lors de la mise à jour d'une loterie vers l'état "terminée".
 */
export interface UpdateLotteryToDoneErorr {
  /**
   * Message d'erreur indiquant le problème survenu lors de la mise à jour.
   * @type {string}
   */
  message: string;

  /**
   * Indique si des erreurs ont eu lieu lors de la mise à jour.
   * @type {boolean}
   */
  errors: boolean;

  /**
   * Détails supplémentaires concernant les erreurs, sous forme d'objet générique.
   * @type {any}
   * @optional
   */
  details?: any;
}

/**
 * Interface pour les numéros gagnants à ajouter à une loterie.
 */
export interface AddWiningsNumber {
  /**
   * Numéros gagnants pour la loterie, sous forme de chaîne.
   * @type {string}
   */
  winning_numbers: string;

  /**
   * Numéros chanceux à ajouter, sous forme de chaîne.
   * @type {string}
   */
  lucky_numbers: string;
}
