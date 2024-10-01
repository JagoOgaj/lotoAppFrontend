export interface AdminInfoResponse {
  first_name: string;
  last_name: string;
  email: string;
}

export interface AdminInfoErrors {
  errors: boolean;
  message: string;
  details?: {
    [key: string]: any;
  };
}

export interface AdminLogoutResponse {
  message: string;
}

export interface AdminLogoutError {
  errors: boolean;
  message: string;
  details: string;
}
