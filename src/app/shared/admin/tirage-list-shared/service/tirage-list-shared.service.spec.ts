import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TirageListSharedService } from './tirage-list-shared.service';
import {
  CreateTirageRessource,
  CreateTirageResponse,
  DeleteTirageResponse,
} from '../../../../constants/ressources/admin/AdminCreateDeleteTirageRessource';
import { ApiAdmin } from '../../../../config/api-admin';
import { TirageStatus } from '../../../../constants/tirageStatus/tirageStatus.constants';

describe('TirageListSharedService', () => {
  let service: TirageListSharedService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TirageListSharedService],
    });
    service = TestBed.inject(TirageListSharedService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('createTirage', () => {
    it('should create a tirage and return response', () => {
      const tirageData: CreateTirageRessource = {
        name: 'Test',
        reward_price: 100,
        status: TirageStatus.SIMULATION,
        max_participants: 10,
      };

      const mockResponse: CreateTirageResponse = {
        message: '',
      };

      service.createTirage(tirageData).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(
        `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.CREATE_LOTTERY}`,
      );
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });

    it('should handle error on creation failure', () => {
      const tirageData: CreateTirageRessource = {
        name: 'Test',
        reward_price: 100,
        status: TirageStatus.SIMULATION,
        max_participants: 10,
      };

      const mockError = {
        error: {
          message: 'Erreur de création',
          details: { name: 'Nom invalide' },
        },
      };

      service.createTirage(tirageData).subscribe({
        next: () => fail('should have failed with the 500 error'),
        error: (error) => {
          expect(error.errors).toBe(true);
          expect(error.message).toBe('Erreur de création');
          expect(error.details.name).toBe('Nom invalide');
        },
      });

      const req = httpMock.expectOne(
        `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.CREATE_LOTTERY}`,
      );
      req.flush(mockError, { status: 500, statusText: 'Server Error' });
    });
  });

  describe('deleteTirage', () => {
    it('should delete a tirage and return response', () => {
      const tirageId = 1;
      const mockResponse: DeleteTirageResponse = {
        message: '',
      };

      service.deleteTirage(tirageId).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(
        `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.DELETE_LOTTERY(tirageId)}`,
      );
      expect(req.request.method).toBe('DELETE');
      req.flush(mockResponse);
    });

    it('should handle error on deletion failure', () => {
      const tirageId = 1;
      const mockError = {
        error: {
          message: 'Erreur de suppression',
          details: {},
        },
      };

      service.deleteTirage(tirageId).subscribe({
        next: () => fail('should have failed with the 500 error'),
        error: (error) => {
          expect(error.errors).toBe(true);
          expect(error.message).toBe('Erreur de suppression');
        },
      });

      const req = httpMock.expectOne(
        `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.DELETE_LOTTERY(tirageId)}`,
      );
      req.flush(mockError, { status: 500, statusText: 'Server Error' });
    });
  });
});
