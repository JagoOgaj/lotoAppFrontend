/**
 * Interface pour la réponse contenant les informations d'un administrateur.
 */
export interface AdminInfoResponse {
  /**
   * Prénom de l'administrateur.
   * @type {string}
   */
  first_name: string;

  /**
   * Nom de famille de l'administrateur.
   * @type {string}
   */
  last_name: string;

  /**
   * Adresse e-mail de l'administrateur.
   * @type {string}
   */
  email: string;
}

/**
 * Interface pour les erreurs liées aux informations de l'administrateur.
 */
export interface AdminInfoErrors {
  /**
   * Indique si des erreurs ont eu lieu.
   * @type {boolean}
   */
  errors: boolean;

  /**
   * Message d'erreur indiquant le problème survenu.
   * @type {string}
   */
  message: string;

  /**
   * Détails supplémentaires concernant les erreurs,
   * incluant des informations spécifiques sur chaque erreur.
   * @type {object}
   * @optional
   */
  details?: {
    /**
     * Permet d'ajouter des erreurs spécifiques avec des clés dynamiques.
     * @type {any}
     */
    [key: string]: any;
  };
}

/**
 * Interface pour la réponse de déconnexion d'un administrateur.
 */
export interface AdminLogoutResponse {
  /**
   * Message de confirmation ou d'information concernant la déconnexion de l'administrateur.
   * @type {string}
   */
  message: string;
}

/**
 * Interface pour les erreurs de déconnexion d'un administrateur.
 */
export interface AdminLogoutError {
  /**
   * Indique si des erreurs ont eu lieu.
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
   */
  details: string;
}
