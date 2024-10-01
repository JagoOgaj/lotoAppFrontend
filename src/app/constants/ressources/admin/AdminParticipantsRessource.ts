export interface ParticipantRessource {
  user_id: number;
  user_name: string;
  email: string;
  numbers: string;
  numbers_lucky: string;
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
