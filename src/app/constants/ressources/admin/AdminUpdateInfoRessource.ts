export interface UpdateInfoAdmin {
  first_name?: string;
  last_name?: string;
  email?: string;
}

export interface UpdateInfoAdminResponse {
  message: string;
}

export interface UpdateInfoAdminResponseError {
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

export interface UpdatePasswordAdmin {
  old_password: string;
  new_password: string;
}

export interface UpdatePassworAdmindResponse {
  message: string;
}

export interface UpdatePasswordUAdminError {
  errors: boolean;
  message: string;
  details?: {
    password?: string[];
    new_password?: string[];
  };
}

export interface UpdatePasswordAdminError {
  errors: boolean;
  message: string;
  details?: {
    password: string[];
    new_password?: string[];
  };
}

export interface UpdatePasswordAdmin {
  old_password: string;
  new_password: string;
}
