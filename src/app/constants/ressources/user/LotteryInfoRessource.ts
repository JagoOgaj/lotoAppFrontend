import { LotteryOverviewResponse } from './tirageUserRessource';

export interface LotteryInfoResponse {
  message: string;
  data: LotteryOverviewResponse;
}

export interface LotteryInfoErreur {
  message: string;
  errors: boolean;
  details?: string;
}

export interface DrawRank {
  rank: number;
  name: string;
  score: number;
  winnings: number;
}

export type DrawRanks = DrawRank[];

export interface LotteryInfoRankResponse {
  players: DrawRanks;
  currentUser: DrawRank;
}

export interface LotteryInfoRankError {
  message: string;
  errors: boolean;
  details?: string;
}
