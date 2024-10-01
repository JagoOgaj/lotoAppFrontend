export interface LogoutUserResponse {
  message: string;
}

export interface LogoutUserError {
  message: string;
  errors: boolean;
  details: string;
}
