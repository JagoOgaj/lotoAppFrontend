import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TirageResultService } from './tirage-result.service';
import {
  AdminLotteryInfoRankResponse,
  AdminLotteryInfoRankError,
} from '../../../../constants/ressources/admin/LotteryInfoRessource';
import { ApiAdmin } from '../../../../config/api-admin';

describe('TirageResultService', () => {
  let service: TirageResultService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TirageResultService],
    });
    service = TestBed.inject(TirageResultService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve ranking for a given lottery id', () => {
    const mockResponse: AdminLotteryInfoRankResponse = {
      message: 'Classement récupéré avec succès',
      data: [
        { rank: 1, name: 'Participant A', score: 95, winnings: 1000 },
        { rank: 2, name: 'Participant B', score: 90, winnings: 500 },
      ],
    };

    const lotteryId = 1;

    service.getRank(lotteryId).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.LOTTERY_RANK(lotteryId)}`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle error response correctly', () => {
    const lotteryId = 2;
    const mockErrorResponse = {
      error: {
        message: 'Erreur serveur',
        details: "Détails de l'erreur",
      },
    };

    service.getRank(lotteryId).subscribe({
      next: () => fail('should have failed with the server error'),
      error: (error: AdminLotteryInfoRankError) => {
        expect(error.errors).toBeTrue();
        expect(error.message).toBe('Erreur serveur');
        expect(error.details).toBe("Détails de l'erreur");
      },
    });

    const req = httpMock.expectOne(
      `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.LOTTERY_RANK(lotteryId)}`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockErrorResponse, { status: 500, statusText: 'Server Error' });
  });
});
