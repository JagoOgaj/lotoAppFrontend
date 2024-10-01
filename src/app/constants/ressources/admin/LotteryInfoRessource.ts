import {
  LotteriesOverviewResponse,
  LotteryOverviewResponse,
} from '../user/tirageUserRessource';

export interface LotteryInfoAdminResponse {
  message: string;
  data: LotteryOverviewResponse;
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
