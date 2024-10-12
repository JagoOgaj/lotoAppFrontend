/**
 * Interface pour la mise à jour des informations d'un administrateur.
 */
export interface UpdateInfoAdmin {
  /**
   * Prénom de l'administrateur à mettre à jour.
   * @type {string}
   * @optional
   */
  first_name?: string;

  /**
   * Nom de famille de l'administrateur à mettre à jour.
   * @type {string}
   * @optional
   */
  last_name?: string;

  /**
   * Adresse e-mail de l'administrateur à mettre à jour.
   * @type {string}
   * @optional
   */
  email?: string;
}

/**
 * Interface pour la réponse à la mise à jour des informations d'un administrateur.
 */
export interface UpdateInfoAdminResponse {
  /**
   * Message de confirmation ou d'information concernant la mise à jour des informations.
   * @type {string}
   */
  message: string;
}

/**
 * Interface pour les erreurs lors de la mise à jour des informations d'un administrateur.
 */
export interface UpdateInfoAdminResponseError {
  /**
   * Indique si des erreurs ont eu lieu lors de la mise à jour.
   * @type {boolean}
   */
  errors: boolean;

  /**
   * Message d'erreur indiquant le problème survenu.
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
     * Permet d'ajouter d'autres erreurs qui ne sont pas explicitement mentionnées.
     * @type {any}
     */
    [key: string]: any;
  };
}

/**
 * Interface pour la mise à jour du mot de passe d'un administrateur.
 */
export interface UpdatePasswordAdmin {
  /**
   * Ancien mot de passe de l'administrateur.
   * @type {string}
   */
  old_password: string;

  /**
   * Nouveau mot de passe de l'administrateur.
   * @type {string}
   */
  new_password: string;
}

/**
 * Interface pour la réponse à la mise à jour du mot de passe d'un administrateur.
 */
export interface UpdatePassworAdmindResponse {
  /**
   * Message de confirmation ou d'information concernant la mise à jour du mot de passe.
   * @type {string}
   */
  message: string;
}

/**
 * Interface pour les erreurs lors de la mise à jour du mot de passe d'un administrateur.
 */
export interface UpdatePasswordUAdminError {
  /**
   * Indique si des erreurs ont eu lieu lors de la mise à jour du mot de passe.
   * @type {boolean}
   */
  errors: boolean;

  /**
   * Message d'erreur indiquant le problème survenu.
   * @type {string}
   */
  message: string;

  /**
   * Détails supplémentaires concernant les erreurs de mise à jour du mot de passe.
   * @type {object}
   * @optional
   */
  details?: {
    /**
     * Liste des erreurs concernant le champ 'password'.
     * @type {string[]}
     * @optional
     */
    password?: string[];

    /**
     * Liste des erreurs concernant le champ 'new_password'.
     * @type {string[]}
     * @optional
     */
    new_password?: string[];
  };
}

/**
 * Interface pour les erreurs lors de la mise à jour du mot de passe d'un administrateur.
 */
export interface UpdatePasswordAdminError {
  /**
   * Indique si des erreurs ont eu lieu lors de la mise à jour du mot de passe.
   * @type {boolean}
   */
  errors: boolean;

  /**
   * Message d'erreur indiquant le problème survenu.
   * @type {string}
   */
  message: string;

  /**
   * Détails supplémentaires concernant les erreurs de mise à jour du mot de passe.
   * @type {object}
   * @optional
   */
  details?: {
    /**
     * Liste des erreurs concernant le champ 'password'.
     * @type {string[]}
     */
    password: string[];

    /**
     * Liste des erreurs concernant le champ 'new_password'.
     * @type {string[]}
     * @optional
     */
    new_password?: string[];
  };
}
