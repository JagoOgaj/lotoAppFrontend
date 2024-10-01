export interface ManageRemoveParticipant {
  lottery_id: number;
  user_id: number;
}

export interface RemoveParticipantResponse {
  message: string;
}

export interface RemoveParticipantError {
  errors: boolean;
  message: string;
  details?: string;
}

export interface AddParticipantRessource {
  user_name: string;
  email: string;
  numbers: string;
  numbers_lucky: string;
}

export interface AddParticipantsResponse {
  message: string;
  entry_id: number;
}

export interface AddParticipantsError {
  message: string;
  errors: boolean;
  details?: {
    numbers?: string[];
    lucky_numbers?: string[];
    email?: string[];
    user_name?: string[];
    [key: string]: any;
  };
}
