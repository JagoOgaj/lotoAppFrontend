/**
 * Interface pour les données nécessaires à l'enregistrement d'un utilisateur.
 */
export interface RegistryData {
  /**
   * Prénom de l'utilisateur à enregistrer.
   * @type {string}
   */
  first_name: string;

  /**
   * Nom de famille de l'utilisateur à enregistrer.
   * @type {string}
   */
  last_name: string;

  /**
   * Adresse e-mail de l'utilisateur à enregistrer.
   * @type {string}
   */
  email: string;

  /**
   * Mot de passe de l'utilisateur à enregistrer.
   * @type {string}
   */
  password: string;
}

/**
 * Interface pour la réponse à une demande d'enregistrement réussie d'un utilisateur.
 */
export interface RegistryResponce {
  /**
   * Message de confirmation indiquant que l'enregistrement a été effectué avec succès.
   * @type {string}
   */
  message: string;

  /**
   * Token d'accès généré pour l'utilisateur après l'enregistrement.
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
 * Interface pour les erreurs rencontrées lors de l'enregistrement d'un utilisateur.
 */
export interface RegistryErrors {
  /**
   * Indique si des erreurs ont eu lieu lors de la tentative d'enregistrement.
   * @type {boolean}
   */
  errors: boolean;

  /**
   * Message d'erreur indiquant le problème survenu lors de l'enregistrement.
   * @type {string}
   */
  message: string;

  /**
   * Détails supplémentaires concernant les erreurs, incluant des erreurs spécifiques pour chaque champ.
   * @type {object}
   * @optional
   */
  details?: {
    /**
     * Liste des erreurs concernant le champ 'first_name'.
     * @type {string[]}
     * @optional
     */
    first_name?: string[];

    /**
     * Liste des erreurs concernant le champ 'last_name'.
     * @type {string[]}
     * @optional
     */
    last_name?: string[];

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
     * Permet d'ajouter d'autres erreurs éventuelles sous forme de clé/valeur.
     * @type {any}
     */
    [key: string]: any;
  };
}
