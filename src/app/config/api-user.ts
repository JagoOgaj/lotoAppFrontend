/**
 * Configuration de l'API pour les opérations liées aux utilisateurs.
 * Contient l'URL de base et les différents points de terminaison (endpoints)
 * pour les opérations disponibles concernant les utilisateurs, telles que la connexion, l'inscription, et la gestion des loteries.
 */
export const ApiUser = {
  /** L'URL de base de l'API des utilisateurs. */
  BASE_URL: 'http://127.0.0.1:8080/user',

  /**
   * Les points de terminaison (endpoints) de l'API des utilisateurs.
   * Chaque propriété représente une opération utilisateur disponible.
   */
  ENDPOINT: {
    /** Endpoint pour la connexion de l'utilisateur. */
    LOGIN: '/login',

    /** Endpoint pour l'inscription d'un nouvel utilisateur. */
    REGISTER: '/register',

    /** Endpoint pour récupérer les informations du compte de l'utilisateur. */
    ACCOUNT_INFO: '/account-info',

    /** Endpoint pour mettre à jour les informations du compte de l'utilisateur. */
    UPDATE_INFO: '/update-info',

    /** Endpoint pour mettre à jour le mot de passe de l'utilisateur. */
    UPDATE_PASSWORD: '/update-password',

    /** Endpoint pour déconnecter l'utilisateur. */
    LOGOUT: '/logout',

    /** Endpoint pour s'inscrire à une loterie. */
    LOTTERY_REGISTRY: '/lottery-registry',

    /** Endpoint pour récupérer l'historique des participations aux loteries. */
    LOTTERY_HISTORY: '/lottery-history',

    /** Endpoint pour récupérer les détails de la loterie actuelle. */
    CURRENT_LOTTERY: '/lottery/current',

    /**
     * Endpoint pour récupérer les détails d'une loterie par son identifiant.
     * @param id - L'identifiant de la loterie.
     * @returns L'URL pour récupérer les détails de la loterie.
     */
    LOTTERY_DETAILS: (id: number) => `/lottery-details/${id}`,

    /**
     * Endpoint pour récupérer le classement d'une loterie par son identifiant.
     * @param id - L'identifiant de la loterie.
     * @returns L'URL pour récupérer le classement de la loterie.
     */
    LOTTERY_RANK: (id: number) => `/lottery-rank/${id}`,
  },
};
