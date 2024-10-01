export interface LoginAdminData {
  email: string;
  password: string;
}

export interface LoginAdminResponse {
  message: string;
  access_token: string;
  refresh_token: string;
}

export interface LoginAdminErrors {
  errors: boolean;
  message: string;
  details?: {
    email?: string[];
    password?: string[];
    emailError?: string;
    passwordError?: string;
  };
}
