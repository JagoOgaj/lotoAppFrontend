export interface LotteryOverviewResponse {
  id: number;
  name: string;
  start_date?: string;
  end_date?: string;
  status: string;
  reward_price: number;
  max_participants: number;
  participant_count: number;
}
export interface LotteryResultReponse {
  winning_numbers: string;
  lucky_numbers: string;
}

export type LotteriesOverviewResponse = LotteryOverviewResponse[];

export interface LotteryOverviewError {
  errors: boolean;
  message: string;
}

export interface LotteryHistory {
  id: number;
  name: string;
  date: string;
  statut: string;
  numerosJoues: string;
  numerosChance: string;
  dateTirage: string;
}

export interface LotteryHistoryResonse {
  message: string;
  data: LotteryHistory[];
}

export interface LotteryHistoryErrors {
  message: string;
  errors: boolean;
  details?: string;
  emptyEntries?: boolean;
}

export type LotteryHistories = LotteryHistory[];
