export interface LotteryRegistryResponse {
  message: string;
}

export interface LotteryRegistryError {
  message: string;
  errors: boolean;
  details?: {
    numbers?: string[];
    lucky_numbers?: string[];
    [key: string]: any;
  };
}

export interface LotteryRegistryData {
  lottery_id: number;
  numbers: string;
  lucky_numbers: string;
}
