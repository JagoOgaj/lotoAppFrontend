/**
 * Interface pour les données de connexion d'un administrateur.
 */
export interface LoginAdminData {
  /**
   * Adresse e-mail de l'administrateur pour la connexion.
   * @type {string}
   */
  email: string;

  /**
   * Mot de passe de l'administrateur pour la connexion.
   * @type {string}
   */
  password: string;
}

/**
 * Interface pour la réponse de connexion d'un administrateur.
 */
export interface LoginAdminResponse {
  /**
   * Message de confirmation ou d'information concernant la connexion.
   * @type {string}
   */
  message: string;

  /**
   * Token d'accès pour les requêtes authentifiées.
   * @type {string}
   */
  access_token: string;

  /**
   * Token de rafraîchissement pour obtenir un nouveau token d'accès.
   * @type {string}
   */
  refresh_token: string;
}

/**
 * Interface pour les erreurs de connexion d'un administrateur.
 */
export interface LoginAdminErrors {
  /**
   * Indique si des erreurs ont eu lieu lors de la connexion.
   * @type {boolean}
   */
  errors: boolean;

  /**
   * Message d'erreur indiquant le problème survenu.
   * @type {string}
   */
  message: string;

  /**
   * Détails supplémentaires concernant les erreurs de connexion.
   * @type {object}
   * @optional
   */
  details?: {
    /**
     * Liste des erreurs concernant le champ 'email'.
     * @type {string[]}
     * @optional
     */
    email?: string[];

    /**
     * Liste des erreurs concernant le champ 'password'.
     * @type {string[]}
     * @optional
     */
    password?: string[];

    /**
     * Message d'erreur spécifique concernant le champ 'email'.
     * @type {string}
     * @optional
     */
    emailError?: string;

    /**
     * Message d'erreur spécifique concernant le champ 'password'.
     * @type {string}
     * @optional
     */
    passwordError?: string;
  };
}
