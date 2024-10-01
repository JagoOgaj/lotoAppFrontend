export interface RegistryData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface RegistryResponce {
  message: string;
  access_token: string;
  refresh_token: string;
}

export interface RegistryErrors {
  errors: boolean;
  message: string;
  details?: {
    first_name?: string[];
    last_name?: string[];
    email?: string[];
    password?: string[];
    [key: string]: any;
  };
}
