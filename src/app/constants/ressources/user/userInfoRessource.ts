export interface UserInfoRessource {
  first_name: string;
  last_name: string;
  email: string;
  notification: boolean;
}

export interface AccountInfoErrors {
  errors: boolean;
  message: string;
  details?: {
    [key: string]: any;
  };
}

export interface UpdateInfoUser {
  first_name?: string;
  last_name?: string;
  email?: string;
  notification?: boolean;
}

export interface UpdateInfoUserResponse {
  message: string;
}

export interface UpdateInfoUserResponseError {
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

export interface UpdatePasswordUser {
  old_password: string;
  new_password: string;
}

export interface UpdatePasswordResponse {
  message: string;
}

export interface UpdatePasswordUserError {
  errors: boolean;
  message: string;
  details?: {
    password?: string[];
    new_password?: string[];
  };
}
