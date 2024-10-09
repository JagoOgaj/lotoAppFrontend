import {
  LotteriesOverviewResponse,
  LotteryOverviewResponse,
} from '../user/tirageUserRessource';

export interface LotteryInfoAdminResponse {
  message: string;
  data: LotteryOverviewResponse;
  numbers?: {
    winning_numbers: string;
    lucky_numbers: string;
  };
}

export interface LotteryInfoAdminErreur {
  message: string;
  errors: boolean;
  details?: string;
}

export interface AllLotteryResponse {
  message: string;
  data: LotteriesOverviewResponse;
}

export interface AllLotteryError {
  message: string;
  errors: boolean;
  details?: string[];
}

export interface DrawRank {
  rank: number;
  name: string;
  score: number;
  winnings: number;
}

export type DrawRanks = DrawRank[];

export interface AdminLotteryInfoRankResponse {
  message: string;
  data: DrawRanks;
}

export interface AdminLotteryInfoRankError {
  message: string;
  errors: boolean;
  details?: string;
}
