/**
 * Enumération des différents états possibles pour un tirage.
 */
export enum TirageStatus {
  /**
   * L'état indique que le tirage est en cours.
   * @type {string}
   */
  EN_COUR = 'EN_COUR',

  /**
   * L'état indique que le tirage est en validation.
   * @type {string}
   */
  EN_VALIDATION = 'EN_VALIDATION',

  /**
   * L'état indique que le tirage est terminé.
   * @type {string}
   */
  TERMINE = 'TERMINE',

  /**
   * L'état indique que le tirage est en mode simulation.
   * @type {string}
   */
  SIMULATION = 'SIMULATION',

  /**
   * L'état indique que la simulation du tirage est terminée.
   * @type {string}
   */
  SIMULATION_TERMINE = 'SIMULATION_TERMINE',
}

/**
 * Interface représentant une option d'état avec un label et une valeur.
 */
export interface StatusOption {
  /**
   * Label de l'option d'état, utilisé pour l'affichage.
   * @type {string}
   */
  label: string;

  /**
   * Valeur de l'option d'état, utilisée dans la logique de traitement.
   * @type {string}
   */
  value: string;
}

/**
 * Type représentant une liste d'options d'état.
 */
export type StatusOptions = StatusOption[];
