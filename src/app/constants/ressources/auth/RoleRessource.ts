/**
 * Interface pour la réponse contenant le rôle d'un utilisateur.
 */
export interface RoleResponse {
  /**
   * Le rôle attribué à l'utilisateur.
   * @type {string}
   */
  role: string;
}

/**
 * Énumération des différents rôles d'utilisateur dans l'application.
 * @enum {string}
 */
export enum Roles {
  /**
   * Rôle d'administrateur avec des privilèges complets.
   * @type {string}
   */
  ADMIN = 'ADMIN',

  /**
   * Rôle d'utilisateur standard avec des privilèges limités.
   * @type {string}
   */
  USER = 'USER',
}
