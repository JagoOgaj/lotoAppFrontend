/**
 * Interface pour la réponse à une demande de déconnexion d'utilisateur.
 */
export interface LogoutUserResponse {
  /**
   * Message de confirmation indiquant que l'utilisateur a été déconnecté avec succès.
   * @type {string}
   */
  message: string;
}

/**
 * Interface pour les erreurs rencontrées lors de la déconnexion d'un utilisateur.
 */
export interface LogoutUserError {
  /**
   * Message d'erreur indiquant le problème survenu lors de la déconnexion.
   * @type {string}
   */
  message: string;

  /**
   * Indique si des erreurs ont eu lieu lors de la tentative de déconnexion.
   * @type {boolean}
   */
  errors: boolean;

  /**
   * Détails supplémentaires concernant les erreurs, décrivant la nature des problèmes rencontrés.
   * @type {string}
   */
  details: string;
}
