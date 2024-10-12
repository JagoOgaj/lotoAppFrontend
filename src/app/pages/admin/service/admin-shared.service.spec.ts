import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AdminSharedService } from './admin-shared.service';
import {
  LotteryInfoAdminResponse,
  LotteryInfoAdminErreur,
} from '../../../constants/ressources/admin/LotteryInfoRessource';
import {
  UpdateLottery,
  UpdateLotteryResponse,
  UpdateLotteryError,
  AddWiningsNumber,
  UpdateLotteryToDoneResponse,
  UpdateLotteryToDoneErorr,
} from '../../../constants/ressources/admin/AdminUpdateLottery';
import { ApiAdmin } from '../../../config/api-admin';

describe('AdminSharedService', () => {
  let service: AdminSharedService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdminSharedService],
    });

    service = TestBed.inject(AdminSharedService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should retrieve tirage details', () => {
    const mockResponse: LotteryInfoAdminResponse = {
      message: 'Détails de la loterie récupérés avec succès',
      data: {
        id: 1,
        name: 'Loterie de Noël',
        start_date: '2023-12-01T00:00:00Z',
        end_date: '2023-12-24T23:59:59Z',
        status: 'active',
        reward_price: 10000,
        max_participants: 100,
        participant_count: 50,
      },
      numbers: {
        winning_numbers: '12, 34, 56',
        lucky_numbers: '7, 8',
      },
    };

    service.getTirageDetails(1).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(
      `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.LOTTERY_DETAILS(1)}`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle error when retrieving tirage details', () => {
    const errorResponse = {
      errors: true,
      message: 'Erreur lors de la récupération',
      details: "Détails de l'erreur",
    };

    service.getTirageDetails(1).subscribe({
      next: () => fail('should have failed with a 500 status'),
      error: (error: LotteryInfoAdminErreur) => {
        expect(error.errors).toBe(true);
        expect(error.message).toContain('Erreur lors de la récupération');
      },
    });

    const req = httpTestingController.expectOne(
      `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.LOTTERY_DETAILS(1)}`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(errorResponse, { status: 500, statusText: 'Server Error' });
  });

  it('should update tirage details', () => {
    const updateData: UpdateLottery = {
      name: 'Loterie de Noël',
      start_date: '2023-12-01T00:00:00Z',
      end_date: '2023-12-24T23:59:59Z',
      status: 'active',
      max_participants: 100,
    };
    const mockResponse: UpdateLotteryResponse = {
      message: 'Mise à jour réussie',
    };

    service.updateTirage(1, updateData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(
      `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.LOTTERY_UPDATE(1)}`,
    );
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updateData);
    req.flush(mockResponse);
  });

  it('should handle error when updating tirage', () => {
    const errorResponse = {
      errors: true,
      message: 'Erreur lors de la mise à jour',
      details: {
        name: ['Ce champ est requis'],
      },
    };

    service.updateTirage(1, {}).subscribe({
      next: () => fail('should have failed with a 400 status'),
      error: (error: UpdateLotteryError) => {
        expect(error.errors).toBe(true);
        expect(error.message).toContain('Erreur lors de la mise à jour');
        expect(error.details?.name).toEqual(['Ce champ est requis']);
      },
    });

    const req = httpTestingController.expectOne(
      `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.LOTTERY_UPDATE(1)}`,
    );
    expect(req.request.method).toBe('PUT');
    req.flush(errorResponse, { status: 400, statusText: 'Bad Request' });
  });

  it('should mark tirage as done and add winnings number', () => {
    const winningsData: AddWiningsNumber = {
      winning_numbers: '123, 456, 789',
      lucky_numbers: '111, 222',
    };
    const mockResponse: UpdateLotteryToDoneResponse = {
      message: 'Tirage marqué comme terminé',
    };

    service.updateTirageToDone(1, winningsData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(
      `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.LOTTERY_VALIDATE(1)}`,
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(winningsData);
    req.flush(mockResponse);
  });

  it('should handle error when marking tirage as done', () => {
    const errorResponse = {
      errors: true,
      message: 'Erreur lors du changement de status',
      details: "Détails de l'erreur",
    };

    service.updateTirageToDone(1, {} as AddWiningsNumber).subscribe({
      next: () => fail('should have failed with a 500 status'),
      error: (error: UpdateLotteryToDoneErorr) => {
        expect(error.errors).toBe(true);
        expect(error.message).toContain('Erreur lors du changement de status');
      },
    });

    const req = httpTestingController.expectOne(
      `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.LOTTERY_VALIDATE(1)}`,
    );
    expect(req.request.method).toBe('POST');
    req.flush(errorResponse, { status: 500, statusText: 'Server Error' });
  });
});
