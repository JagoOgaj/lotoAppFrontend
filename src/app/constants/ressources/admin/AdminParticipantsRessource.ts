export interface ParticipantRessource {
  user_id: number;
  user_name: string;
  email: string;
  numbers: string;
  lucky_numbers: string;
}

export type Participants = ParticipantRessource[];

export interface ParticipantsResponse {
  message: string;
  data: Participants;
}

export interface ParticipantsError {
  message: string;
  erros: boolean;
  details?: string[];
}

export interface PopulateFakeUserResponse {
  message: string;
  total_participants: number;
}
