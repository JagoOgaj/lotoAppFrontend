/**
 * Interface pour gérer la suppression d'un participant d'une loterie.
 */
export interface ManageRemoveParticipant {
  /**
   * Identifiant de la loterie à laquelle le participant appartient.
   * @type {number}
   */
  lottery_id: number;

  /**
   * Identifiant de l'utilisateur (participant) à supprimer.
   * @type {number}
   */
  user_id: number;
}

/**
 * Interface pour la réponse de suppression d'un participant.
 */
export interface RemoveParticipantResponse {
  /**
   * Message de confirmation ou d'information concernant la suppression du participant.
   * @type {string}
   */
  message: string;
}

/**
 * Interface pour les erreurs lors de la suppression d'un participant.
 */
export interface RemoveParticipantError {
  /**
   * Indique si des erreurs ont eu lieu lors de la suppression.
   * @type {boolean}
   */
  errors: boolean;

  /**
   * Message d'erreur indiquant le problème survenu.
   * @type {string}
   */
  message: string;

  /**
   * Détails supplémentaires concernant l'erreur, sous forme de chaîne de caractères.
   * @type {string}
   * @optional
   */
  details?: string;
}

/**
 * Interface pour les ressources nécessaires à l'ajout d'un participant.
 */
export interface AddParticipantRessource {
  /**
   * Nom de l'utilisateur (participant) à ajouter.
   * @type {string}
   */
  user_name: string;

  /**
   * Adresse e-mail de l'utilisateur (participant).
   * @type {string}
   */
  email: string;

  /**
   * Numéros choisis par le participant pour la loterie.
   * @type {string}
   */
  numbers: string;

  /**
   * Numéros chanceux choisis par le participant.
   * @type {string}
   */
  numbers_lucky: string;
}

/**
 * Interface pour la réponse de l'ajout d'un participant.
 */
export interface AddParticipantsResponse {
  /**
   * Message de confirmation ou d'information concernant l'ajout du participant.
   * @type {string}
   */
  message: string;

  /**
   * Identifiant d'entrée du participant dans la loterie.
   * @type {number}
   */
  entry_id: number;
}

/**
 * Interface pour les erreurs lors de l'ajout d'un participant.
 */
export interface AddParticipantsError {
  /**
   * Message d'erreur indiquant le problème survenu lors de l'ajout.
   * @type {string}
   */
  message: string;

  /**
   * Indique si des erreurs ont eu lieu lors de l'ajout.
   * @type {boolean}
   */
  errors: boolean;

  /**
   * Détails supplémentaires concernant les erreurs de validation,
   * incluant les problèmes avec les différents champs.
   * @type {object}
   * @optional
   */
  details?: {
    /**
     * Liste des erreurs concernant le champ 'numbers'.
     * @type {string[]}
     * @optional
     */
    numbers?: string[];

    /**
     * Liste des erreurs concernant le champ 'lucky_numbers'.
     * @type {string[]}
     * @optional
     */
    lucky_numbers?: string[];

    /**
     * Liste des erreurs concernant le champ 'email'.
     * @type {string[]}
     * @optional
     */
    email?: string[];

    /**
     * Liste des erreurs concernant le champ 'user_name'.
     * @type {string[]}
     * @optional
     */
    user_name?: string[];

    /**
     * Permet d'ajouter d'autres erreurs qui ne sont pas explicitement mentionnées.
     * @type {any}
     */
    [key: string]: any;
  };
}
