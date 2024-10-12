/**
 * Interface pour créer une ressource de tirage.
 */
export interface CreateTirageRessource {
  /**
   * Nom du tirage.
   * @type {string}
   */
  name: string;

  /**
   * Date de début du tirage.
   * @type {string}
   * @optional
   */
  start_date?: string;

  /**
   * Date de fin du tirage.
   * @type {string}
   * @optional
   */
  end_date?: string;

  /**
   * Prix de la récompense associée au tirage.
   * @type {number}
   */
  reward_price: number;

  /**
   * Statut actuel du tirage.
   * @type {string}
   */
  status: string;

  /**
   * Nombre maximum de participants autorisés au tirage.
   * @type {number}
   */
  max_participants: number;
}

/**
 * Interface pour la réponse de création d'un tirage.
 */
export interface CreateTirageResponse {
  /**
   * Message de confirmation ou d'information concernant la création du tirage.
   * @type {string}
   */
  message: string;
}

/**
 * Interface pour les erreurs de création de tirage.
 */
export interface CreateTirageError {
  /**
   * Message d'erreur indiquant le problème survenu.
   * @type {string}
   */
  message: string;

  /**
   * Indique si des erreurs ont eu lieu.
   * @type {boolean}
   */
  errors: boolean;

  /**
   * Détails supplémentaires concernant les erreurs,
   * incluant les validations des attributs spécifiques.
   * @type {object}
   * @optional
   */
  details?: {
    /**
     * Liste des erreurs concernant le champ 'name'.
     * @type {string[]}
     * @optional
     */
    name?: string[];

    /**
     * Liste des erreurs concernant le champ 'status'.
     * @type {string[]}
     * @optional
     */
    status?: string[];

    /**
     * Liste des erreurs concernant le champ 'max_participants'.
     * @type {string[]}
     * @optional
     */
    max_participants?: string[];

    /**
     * Liste des erreurs concernant le champ 'reward_price'.
     * @type {string[]}
     * @optional
     */
    reward_price?: string[];

    /**
     * Liste des erreurs concernant le champ 'start_date'.
     * @type {string[]}
     * @optional
     */
    start_date?: string[];

    /**
     * Liste des erreurs concernant le champ 'end_date'.
     * @type {string[]}
     * @optional
     */
    end_date?: string[];

    /**
     * Permet d'ajouter d'autres erreurs qui ne sont pas explicitement mentionnées.
     * @type {any}
     */
    [key: string]: any;
  };
}

/**
 * Interface pour la réponse de suppression d'un tirage.
 */
export interface DeleteTirageResponse {
  /**
   * Message de confirmation ou d'information concernant la suppression du tirage.
   * @type {string}
   */
  message: string;
}

/**
 * Interface pour les erreurs de suppression de tirage.
 */
export interface DeleteTirageError {
  /**
   * Message d'erreur indiquant le problème survenu.
   * @type {string}
   */
  message: string;

  /**
   * Indique si des erreurs ont eu lieu.
   * @type {boolean}
   */
  errors: boolean;

  /**
   * Détails supplémentaires concernant l'erreur, sous forme de chaîne de caractères.
   * @type {string}
   * @optional
   */
  details?: string;
}
