import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DrawRankService } from './draw-rank.service';
import {
  LotteryInfoRankResponse,
  LotteryInfoRankError,
} from '../../../../constants/ressources/user/LotteryInfoRessource';
import { ApiUser } from '../../../../config/api-user';

describe('DrawRankService', () => {
  let service: DrawRankService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DrawRankService],
    });
    service = TestBed.inject(DrawRankService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should retrieve the rank of a draw', () => {
    const mockResponse: LotteryInfoRankResponse = {
      message: 'Classement récupéré avec succès.',
      data: [
        {
          rank: 1,
          name: 'John Doe',
          score: 95,
          winnings: 500.0,
        },
        {
          rank: 2,
          name: 'Jane Smith',
          score: 90,
          winnings: 300.0,
        },
        {
          rank: 3,
          name: 'Alice Johnson',
          score: 85,
          winnings: 200.0,
        },
      ],
      currentUser: {
        rank: 1,
        name: 'John Doe',
        score: 95,
        winnings: 500.0,
      },
    };

    service.getRankTirage(1).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(
      `${ApiUser.BASE_URL}${ApiUser.ENDPOINT.LOTTERY_RANK(1)}`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle error when retrieving draw rank', () => {
    const errorResponse = {
      error: {
        message: 'An error occurred',
        details: 'Detailed error message',
      },
    };

    service.getRankTirage(1).subscribe(
      () => fail('expected an error, not data'),
      (error: LotteryInfoRankError) => {
        expect(error.errors).toBeTrue();
        expect(error.message).toEqual('An error occurred');
        expect(error.details).toEqual('Detailed error message');
      },
    );

    const req = httpTestingController.expectOne(
      `${ApiUser.BASE_URL}${ApiUser.ENDPOINT.LOTTERY_RANK(1)}`,
    );
    req.flush(errorResponse, { status: 500, statusText: 'Server Error' });
  });

  it('should retrieve the reward PDF', () => {
    const mockBlob = new Blob(['PDF content'], { type: 'application/pdf' });

    service.getRewardPdf(1).subscribe((blob) => {
      expect(blob).toBeInstanceOf(Blob);
      expect(blob.size).toBeGreaterThan(0);
    });

    const req = httpTestingController.expectOne(
      `${ApiUser.BASE_URL}${ApiUser.ENDPOINT.REWARD_PDF(1)}`,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockBlob);
  });
});
