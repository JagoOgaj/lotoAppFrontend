export interface ContactUsRessource {
  email: string;
  message: string;
}

export interface ContactUsResponse {
  message: string;
}

export interface ContactUsErrors {
  message: string;
  errors: boolean;
  details: string;
}
