/**
 * Configuration de l'API pour les opérations d'authentification.
 * Contient l'URL de base et les différents points de terminaison (endpoints) pour les opérations
 * disponibles liées à l'authentification des utilisateurs.
 */
export const ApiAuth = {
  /** L'URL de base de l'API d'authentification. */
  BASE_URL: 'http://127.0.0.1:8080/auth',

  /**
   * Les points de terminaison (endpoints) de l'API d'authentification.
   * Chaque propriété représente une opération d'authentification disponible.
   */
  ENDPOINT: {
    /** Endpoint pour rafraîchir le token d'accès. */
    REFRESH: '/refresh',

    /** Endpoint pour révoquer l'accès d'un utilisateur. */
    REVOKE_ACCESS: '/revoke_access',

    /** Endpoint pour révoquer le token de rafraîchissement. */
    REVOKE_REFRESH: '/revoke_refresh',

    /** Endpoint pour récupérer le rôle d'un utilisateur. */
    GET_USER_ROLE: '/get-role',
  },
};
