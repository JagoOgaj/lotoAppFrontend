import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UserPlayServiceService } from './user-play-service.service';
import {
  LotteryOverviewResponse,
  LotteryOverviewError,
} from '../../../../constants/ressources/user/tirageUserRessource';
import { ApiUser } from '../../../../config/api-user';

describe('UserPlayServiceService', () => {
  let service: UserPlayServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserPlayServiceService],
    });

    service = TestBed.inject(UserPlayServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Vérifie qu'il n'y a pas de requêtes en attente
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve the current lottery', () => {
    const mockResponse: LotteryOverviewResponse = {
      // Remplissez avec les données mock appropriées
      id: 1,
      name: 'Loterie Test',
      status: 'VALIDATION',
      max_participants: 5,
      reward_price: 100,
      participant_count: 5,
    };

    service.getCurentTirage().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${ApiUser.BASE_URL}${ApiUser.ENDPOINT.CURRENT_LOTTERY}`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse); // Simule la réponse du serveur
  });

  it('should handle error when retrieving current lottery', () => {
    const mockError: LotteryOverviewError = {
      errors: true,
      message: 'Aucun tirage',
    };

    service.getCurentTirage().subscribe({
      next: () => fail('should have failed with an error'),
      error: (error) => {
        expect(error).toEqual(mockError);
      },
    });

    const req = httpMock.expectOne(
      `${ApiUser.BASE_URL}${ApiUser.ENDPOINT.CURRENT_LOTTERY}`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockError, { status: 400, statusText: 'Bad Request' }); // Simule une erreur 400
  });

  it('should notify lottery update', () => {
    const spy = jest.fn();
    service.currentLotteryUpdated$.subscribe(spy);

    service.notifyLotteryUpdate();
    expect(spy).toHaveBeenCalled();
  });

  it('should notify user registered', () => {
    const spy = jest.fn();
    service.currentLotteryUpdated$.subscribe(spy);

    service.notifyUserRegistered();
    expect(spy).toHaveBeenCalled();
  });
});
