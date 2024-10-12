/**
 * Interface pour les données soumises via le formulaire de contact.
 */
export interface ContactUsRessource {
  /**
   * Adresse e-mail de l'utilisateur souhaitant contacter le support.
   * @type {string}
   */
  email: string;

  /**
   * Message que l'utilisateur souhaite envoyer au support.
   * @type {string}
   */
  message: string;
}

/**
 * Interface pour la réponse à une soumission réussie du formulaire de contact.
 */
export interface ContactUsResponse {
  /**
   * Message de confirmation indiquant que le message a été reçu.
   * @type {string}
   */
  message: string;
}

/**
 * Interface pour les erreurs rencontrées lors de la soumission du formulaire de contact.
 */
export interface ContactUsErrors {
  /**
   * Message d'erreur indiquant le problème survenu lors de la soumission.
   * @type {string}
   */
  message: string;

  /**
   * Indique si des erreurs ont eu lieu lors de la soumission.
   * @type {boolean}
   */
  errors: boolean;

  /**
   * Détails supplémentaires concernant les erreurs, décrivant la nature des problèmes rencontrés.
   * @type {string}
   */
  details: string;
}
