/**
 * Interface représentant les ressources d'un participant.
 */
export interface ParticipantRessource {
  /**
   * Identifiant unique de l'utilisateur (participant).
   * @type {number}
   */
  user_id: number;

  /**
   * Nom de l'utilisateur (participant).
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
  lucky_numbers: string;
}

/**
 * Type représentant une liste de ressources de participants.
 * @type {ParticipantRessource[]}
 */
export type Participants = ParticipantRessource[];

/**
 * Interface pour la réponse contenant la liste des participants.
 */
export interface ParticipantsResponse {
  /**
   * Message de confirmation ou d'information concernant la récupération des participants.
   * @type {string}
   */
  message: string;

  /**
   * Liste des participants.
   * @type {Participants}
   */
  data: Participants;
}

/**
 * Interface pour les erreurs lors de la récupération des participants.
 */
export interface ParticipantsError {
  /**
   * Message d'erreur indiquant le problème survenu.
   * @type {string}
   */
  message: string;

  /**
   * Indique si des erreurs ont eu lieu lors de la récupération des participants.
   * @type {boolean}
   */
  erros: boolean;

  /**
   * Détails supplémentaires concernant les erreurs, sous forme de tableau de chaînes.
   * @type {string[]}
   * @optional
   */
  details?: string[];
}

/**
 * Interface pour la réponse à la demande de peuplement d'utilisateurs fictifs.
 */
export interface PopulateFakeUserResponse {
  /**
   * Message de confirmation ou d'information concernant le peuplement d'utilisateurs fictifs.
   * @type {string}
   */
  message: string;

  /**
   * Nombre total de participants créés.
   * @type {number}
   */
  total_participants: number;
}
