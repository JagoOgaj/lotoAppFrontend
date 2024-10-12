import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DrawService } from './draw.service';
import {
  LotteryInfoResponse,
  LotteryInfoErreur,
} from '../../../constants/ressources/user/LotteryInfoRessource';
import { ApiUser } from '../../../config/api-user';

describe('DrawService', () => {
  let service: DrawService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DrawService],
    });

    service = TestBed.inject(DrawService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("devrait récupérer les détails d'un tirage", () => {
    const mockResponse: LotteryInfoResponse = {
      message: 'Tirage récupéré avec succès.',
      data: {
        id: 1,
        name: 'Loterie Nationale',
        start_date: '2024-10-01T00:00:00Z',
        end_date: '2024-10-31T23:59:59Z',
        status: 'active',
        reward_price: 1000000,
        max_participants: 10000,
        participant_count: 5000,
      },
      numbers: {
        winning_numbers: '5, 12, 23, 34, 45',
        lucky_numbers: '3, 7, 21',
      },
    };

    service.getTirageOverview(1).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(
      `${ApiUser.BASE_URL}${ApiUser.ENDPOINT.LOTTERY_DETAILS(1)}`,
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);
  });

  it('devrait gérer les erreurs lors de la récupération des détails du tirage', () => {
    const mockErrorResponse = {
      message: 'Erreur de tirage',
      details: "Des détails supplémentaires sur l'erreur",
    };

    service.getTirageOverview(1).subscribe({
      next: () => fail('doit échouer avec une erreur'),
      error: (error: LotteryInfoErreur) => {
        expect(error.errors).toBe(true);
        expect(error.message).toBe(mockErrorResponse.message);
        expect(error.details).toBe(mockErrorResponse.details);
      },
    });

    const req = httpTestingController.expectOne(
      `${ApiUser.BASE_URL}${ApiUser.ENDPOINT.LOTTERY_DETAILS(1)}`,
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockErrorResponse, { status: 400, statusText: 'Bad Request' });
  });
});
