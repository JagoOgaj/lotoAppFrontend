/**
 * Interface pour les données de connexion fournies par l'utilisateur.
 */
export interface LoginData {
  /**
   * Adresse e-mail de l'utilisateur souhaitant se connecter.
   * @type {string}
   */
  email: string;

  /**
   * Mot de passe de l'utilisateur pour l'authentification.
   * @type {string}
   */
  password: string;
}

/**
 * Interface pour la réponse à une tentative de connexion réussie.
 */
export interface LoginResponse {
  /**
   * Message de confirmation ou d'information concernant la connexion.
   * @type {string}
   */
  message: string;

  /**
   * Token d'accès généré pour l'utilisateur après connexion réussie.
   * @type {string}
   */
  access_token: string;

  /**
   * Token de rafraîchissement utilisé pour obtenir un nouveau token d'accès.
   * @type {string}
   */
  refresh_token: string;
}

/**
 * Interface pour les erreurs rencontrées lors de la tentative de connexion.
 */
export interface LoginErrors {
  /**
   * Indique si des erreurs ont eu lieu lors de la tentative de connexion.
   * @type {boolean}
   */
  errors: boolean;

  /**
   * Message d'erreur indiquant le problème survenu lors de la connexion.
   * @type {string}
   */
  message: string;

  /**
   * Détails supplémentaires concernant les erreurs, incluant les erreurs spécifiques à chaque champ.
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
     * Erreur spécifique concernant l'email.
     * @type {string}
     * @optional
     */
    emailError?: string;

    /**
     * Erreur spécifique concernant le mot de passe.
     * @type {string}
     * @optional
     */
    passwordError?: string;
  };
}
