/**
 * Interface pour les informations d'un utilisateur.
 */
export interface UserInfoRessource {
  /**
   * Prénom de l'utilisateur.
   * @type {string}
   */
  first_name: string;

  /**
   * Nom de famille de l'utilisateur.
   * @type {string}
   */
  last_name: string;

  /**
   * Adresse e-mail de l'utilisateur.
   * @type {string}
   */
  email: string;

  /**
   * Indique si l'utilisateur souhaite recevoir des notifications.
   * @type {boolean}
   */
  notification: boolean;
}

/**
 * Interface pour les erreurs rencontrées lors de la récupération des informations de compte.
 */
export interface AccountInfoErrors {
  /**
   * Indique si des erreurs ont eu lieu lors de la requête.
   * @type {boolean}
   */
  errors: boolean;

  /**
   * Message d'erreur indiquant le problème survenu.
   * @type {string}
   */
  message: string;

  /**
   * Détails supplémentaires concernant les erreurs, sous forme de clé/valeur.
   * @type {object}
   * @optional
   */
  details?: {
    /**
     * Permet d'ajouter d'autres erreurs éventuelles sous forme de clé/valeur.
     * @type {any}
     */
    [key: string]: any;
  };
}

/**
 * Interface pour les données mises à jour d'un utilisateur.
 */
export interface UpdateInfoUser {
  /**
   * Nouveau prénom de l'utilisateur (optionnel).
   * @type {string}
   * @optional
   */
  first_name?: string;

  /**
   * Nouveau nom de famille de l'utilisateur (optionnel).
   * @type {string}
   * @optional
   */
  last_name?: string;

  /**
   * Nouvelle adresse e-mail de l'utilisateur (optionnel).
   * @type {string}
   * @optional
   */
  email?: string;

  /**
   * Indique si l'utilisateur souhaite recevoir des notifications (optionnel).
   * @type {boolean}
   * @optional
   */
  notification?: boolean;
}

/**
 * Interface pour la réponse à une demande de mise à jour des informations d'un utilisateur réussie.
 */
export interface UpdateInfoUserResponse {
  /**
   * Message de confirmation indiquant que la mise à jour a été effectuée avec succès.
   * @type {string}
   */
  message: string;
}

/**
 * Interface pour les erreurs rencontrées lors de la mise à jour des informations d'un utilisateur.
 */
export interface UpdateInfoUserResponseError {
  /**
   * Indique si des erreurs ont eu lieu lors de la tentative de mise à jour.
   * @type {boolean}
   */
  errors: boolean;

  /**
   * Message d'erreur indiquant le problème survenu lors de la mise à jour.
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

/**
 * Interface pour les données nécessaires à la mise à jour du mot de passe d'un utilisateur.
 */
export interface UpdatePasswordUser {
  /**
   * Ancien mot de passe de l'utilisateur.
   * @type {string}
   */
  old_password: string;

  /**
   * Nouveau mot de passe de l'utilisateur.
   * @type {string}
   */
  new_password: string;
}

/**
 * Interface pour la réponse à une demande de mise à jour du mot de passe réussie.
 */
export interface UpdatePasswordResponse {
  /**
   * Message de confirmation indiquant que la mise à jour du mot de passe a été effectuée avec succès.
   * @type {string}
   */
  message: string;
}

/**
 * Interface pour les erreurs rencontrées lors de la mise à jour du mot de passe d'un utilisateur.
 */
export interface UpdatePasswordUserError {
  /**
   * Indique si des erreurs ont eu lieu lors de la tentative de mise à jour.
   * @type {boolean}
   */
  errors: boolean;

  /**
   * Message d'erreur indiquant le problème survenu lors de la mise à jour du mot de passe.
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
