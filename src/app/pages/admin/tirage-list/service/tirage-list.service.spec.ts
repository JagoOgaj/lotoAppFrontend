import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TirageListService } from './tirage-list.service';
import { ApiAdmin } from '../../../../config/api-admin';
import {
  AllLotteryResponse,
  AllLotteryError,
} from '../../../../constants/ressources/admin/LotteryInfoRessource';
import { of, throwError } from 'rxjs';

describe('TirageListService', () => {
  let service: TirageListService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TirageListService],
    });

    service = TestBed.inject(TirageListService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve the lottery list successfully', () => {
    const mockResponse: AllLotteryResponse = {
      message: 'Success',
      data: [
        {
          id: 1,
          name: 'Lottery 1',
          participant_count: 5,
          reward_price: 1000,
          max_participants: 10,
          status: 'active',
        },
      ],
    };

    service.getTirageList().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.LOTTERY_LIST}`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle error when retrieving the lottery list', () => {
    const mockErrorResponse = {
      error: {
        message: 'Erreur de tirage',
        details: "Détails de l'erreur",
      },
    };

    service.getTirageList().subscribe({
      next: () => fail('should have failed with the 404 error'),
      error: (error: AllLotteryError) => {
        expect(error.errors).toBeTruthy();
        expect(error.message).toBe('Erreur de tirage');
        if (error.details) {
          expect(error.details).toBe("Détails de l'erreur");
        }
      },
    });

    const req = httpMock.expectOne(
      `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.LOTTERY_LIST}`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockErrorResponse, { status: 404, statusText: 'Not Found' });
  });
});
