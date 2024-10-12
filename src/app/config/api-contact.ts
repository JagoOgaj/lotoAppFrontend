/**
 * Configuration de l'API pour les opérations liées au contact.
 * Contient l'URL de base et les différents points de terminaison (endpoints)
 * pour les opérations de contact, comme le formulaire de contact.
 */
export const ApiContact = {
  /** L'URL de base de l'API de contact. */
  BASE_URL: 'http://127.0.0.1:8080/contact',

  /**
   * Les points de terminaison (endpoints) de l'API de contact.
   * Chaque propriété représente une opération de contact disponible.
   */
  ENDPOINT: {
    /** Endpoint pour soumettre un message via le formulaire de contact. */
    CONTACT_US: '/contact-us',
  },
};
