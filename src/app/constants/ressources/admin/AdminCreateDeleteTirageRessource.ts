export interface CreateTirageRessource {
  name: string;
  start_date?: string;
  end_date?: string;
  reward_price: number;
  status: string;
  max_participants: number;
}

export interface CreateTirageResponse {
  message: string;
}

export interface CreateTirageError {
  message: string;
  errors: boolean;
  details?: {
    name?: string[];
    status?: string[];
    max_participants?: string[];
    reward_price?: string[];
    start_date?: string[];
    end_date?: string[];
    [key: string]: any;
  };
}

export interface DeleteTirageResponse {
  message: string;
}

export interface DeleteTirageError {
  message: string;
  errors: boolean;
  details?: string;
}
