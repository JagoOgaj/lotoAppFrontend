/**
 * Configuration de l'API pour les opérations administratives.
 * Contient l'URL de base et les différents points de terminaison (endpoints) pour les opérations
 * disponibles dans le module d'administration.
 */
export const ApiAdmin = {
  /** L'URL de base de l'API d'administration. */
  BASE_URL: 'http://127.0.0.1:8080/admin',

  /**
   * Les points de terminaison (endpoints) de l'API.
   * Chaque propriété représente une opération disponible pour l'administration.
   */
  ENDPOINT: {
    /** Endpoint pour la connexion de l'utilisateur. */
    LOGIN: '/login',

    /** Endpoint pour récupérer les informations du compte de l'utilisateur. */
    ACCOUNT_INFO: '/account-info',

    /** Endpoint pour mettre à jour les informations du compte de l'utilisateur. */
    UPDATE_INFO: '/update-info',

    /** Endpoint pour mettre à jour le mot de passe de l'utilisateur. */
    UPDATE_PASSWORD: '/update-password',

    /** Endpoint pour créer une nouvelle loterie. */
    CREATE_LOTTERY: '/create-lottery',

    /**
     * Endpoint pour supprimer une loterie par son identifiant.
     * @param id - L'identifiant de la loterie à supprimer.
     * @returns L'URL pour supprimer la loterie.
     */
    DELETE_LOTTERY: (id: number) => `/delete-lottery/${id}`,

    /** Endpoint pour récupérer la liste des loteries. */
    LOTTERY_LIST: '/lottery-list',

    /**
     * Endpoint pour récupérer les détails d'une loterie par son identifiant.
     * @param id - L'identifiant de la loterie.
     * @returns L'URL pour récupérer les détails de la loterie.
     */
    LOTTERY_DETAILS: (id: number) => `/lottery-details/${id}`,

    /**
     * Endpoint pour mettre à jour une loterie par son identifiant.
     * @param id - L'identifiant de la loterie à mettre à jour.
     * @returns L'URL pour mettre à jour la loterie.
     */
    LOTTERY_UPDATE: (id: number) => `/update-lottery/${id}`,

    /**
     * Endpoint pour récupérer la liste des participants d'une loterie par son identifiant.
     * @param id - L'identifiant de la loterie.
     * @returns L'URL pour récupérer la liste des participants.
     */
    PARTICIPANTS_LIST: (id: number) => `/participants-list/${id}`,

    /**
     * Endpoint pour récupérer le classement d'une loterie par son identifiant.
     * @param id - L'identifiant de la loterie.
     * @returns L'URL pour récupérer le classement de la loterie.
     */
    LOTTERY_RANK: (id: number) => `/lottery-rank/${id}`,

    /** Endpoint pour retirer un participant d'une loterie. */
    MANAGE_PARTICIPANTS_REMOVE: `/manage-participants/remove`,

    /**
     * Endpoint pour ajouter un participant à une loterie par son identifiant.
     * @param id - L'identifiant du participant à ajouter.
     * @returns L'URL pour ajouter le participant.
     */
    MANAGE_PARTICIPANTS_ADD: (id: number) => `/manage-participants/add/${id}`,

    /**
     * Endpoint pour valider une loterie par son identifiant.
     * @param id - L'identifiant de la loterie à valider.
     * @returns L'URL pour valider la loterie.
     */
    LOTTERY_VALIDATE: (id: number) => `/lottery/validate/${id}`,

    /**
     * Endpoint pour peupler la base de données avec des utilisateurs fictifs par identifiant.
     * @param id - L'identifiant pour peupler des utilisateurs fictifs.
     * @returns L'URL pour peupler les utilisateurs fictifs.
     */
    POPULATE_FAKE_USER: (id: number) => `/populate-fake-users/${id}`,

    /** Endpoint pour déconnecter l'utilisateur. */
    LOGOUT: '/logout',
  },
};
