import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UserHistoryService } from './user-history.service';
import { ApiUser } from '../../../../config/api-user';
import {
  LotteryHistoryResonse,
  LotteryHistoryErrors,
} from '../../../../constants/ressources/user/tirageUserRessource';

describe('UserHistoryService', () => {
  let service: UserHistoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserHistoryService],
    });
    service = TestBed.inject(UserHistoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return lottery history on success', () => {
    const mockResponse: LotteryHistoryResonse = {
      message: '',
      data: [],
    };

    service.getHistory().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${ApiUser.BASE_URL}${ApiUser.ENDPOINT.LOTTERY_HISTORY}`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle error response', () => {
    const mockErrorResponse: LotteryHistoryErrors = {
      message: 'Erreur de récupération',
      errors: true,
    };

    service.getHistory().subscribe({
      next: () => fail('should have failed with 404 error'),
      error: (error: LotteryHistoryErrors) => {
        expect(error).toEqual(mockErrorResponse);
      },
    });

    const req = httpMock.expectOne(
      `${ApiUser.BASE_URL}${ApiUser.ENDPOINT.LOTTERY_HISTORY}`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockErrorResponse, { status: 404, statusText: 'Not Found' });
  });

  it('should handle empty entries in error response', () => {
    const mockErrorResponse: LotteryHistoryErrors = {
      message: 'Erreur de récupération',
      errors: true,
      emptyEntries: true,
    };

    service.getHistory().subscribe({
      next: () => fail('should have failed with empty entries error'),
      error: (error: LotteryHistoryErrors) => {
        expect(error.emptyEntries).toBe(true);
      },
    });

    const req = httpMock.expectOne(
      `${ApiUser.BASE_URL}${ApiUser.ENDPOINT.LOTTERY_HISTORY}`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockErrorResponse, { status: 400, statusText: 'Bad Request' });
  });
});
