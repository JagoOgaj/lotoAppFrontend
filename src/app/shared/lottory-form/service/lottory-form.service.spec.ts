import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  LotteryRegistryData,
  LotteryRegistryResponse,
  LotteryRegistryError,
} from '../../../constants/ressources/user/LotteryRegistryRessource';
import { ApiUser } from '../../../config/api-user';
import { LottoryFormService } from './lottory-form.service';

describe('LotteryFormService', () => {
  let service: LottoryFormService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LottoryFormService],
    });

    service = TestBed.inject(LottoryFormService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('devrait être créé', () => {
    expect(service).toBeTruthy();
  });

  it('devrait enregistrer les données de loterie et retourner la réponse', () => {
    const mockData: LotteryRegistryData = {
      lottery_id: 1,
      lucky_numbers: '1, 2, 3, 4, 5',
      numbers: '10, 20, 30, 40, 50',
    };

    const mockResponse: LotteryRegistryResponse = {
      message: 'Enregistrement réussi',
    };

    service.registryToLottery(mockData).subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${ApiUser.BASE_URL}${ApiUser.ENDPOINT.LOTTERY_REGISTRY}`,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it("devrait gérer les erreurs lors de l'enregistrement", () => {
    const mockData: LotteryRegistryData = {
      lottery_id: 1,
      lucky_numbers: '1, 2, 3, 4, 5',
      numbers: '10, 20, 30, 40, 50',
    };

    const mockErrorResponse = {
      message: "Erreur lors de l'enregistrement",
      details: {
        lucky_numbers: ['Doit contenir 5 numéros'],
        numbers: ['Doit contenir 5 numéros'],
      },
    };

    service.registryToLottery(mockData).subscribe({
      next: () => fail('devrait avoir échoué'),
      error: (error: LotteryRegistryError) => {
        expect(error.message).toBe("Erreur lors de l'enregistrement");
        expect(error.errors).toBe(true);
        expect(error.details?.lucky_numbers).toEqual([
          'Doit contenir 5 numéros',
        ]);
        expect(error.details?.numbers).toEqual(['Doit contenir 5 numéros']);
      },
    });

    const req = httpMock.expectOne(
      `${ApiUser.BASE_URL}${ApiUser.ENDPOINT.LOTTERY_REGISTRY}`,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockErrorResponse, { status: 400, statusText: 'Bad Request' });
  });
});
