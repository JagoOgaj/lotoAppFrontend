export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  access_token: string;
  refresh_token: string;
}

export interface LoginErrors {
  errors: boolean;
  message: string;
  details?: {
    email?: string[];
    password?: string[];
    emailError?: string;
    passwordError?: string;
  };
}
