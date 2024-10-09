export interface UpdateLottery {
  name?: string;
  start_date?: string;
  end_date?: string;
  status?: string;
  max_participants?: number;
}

export interface UpdateLotteryResponse {
  message: string;
}

export interface UpdateLotteryError {
  message: string;
  errors: boolean;
  details?: {
    name?: string[];
    start_date?: string[];
    end_date?: string[];
    status?: string[];
    max_participants?: string[];
    [key: string]: string[] | undefined;
  };
}

export interface UpdateLotteryToDoneResponse {
  message: string;
}

export interface UpdateLotteryToDoneErorr {
  message: string;
  errors: boolean;
  details?: any;
}

export interface AddWiningsNumber {
  winning_numbers: string;
  lucky_numbers: string;
}
