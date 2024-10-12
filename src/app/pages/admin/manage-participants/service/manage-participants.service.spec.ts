import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ManageParticipantsService } from './manage-participants.service';
import { ApiAdmin } from '../../../../config/api-admin';
import {
  ParticipantsResponse,
  ParticipantsError,
} from '../../../../constants/ressources/admin/AdminParticipantsRessource';

describe('ManageParticipantsService', () => {
  let service: ManageParticipantsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ManageParticipantsService],
    });
    service = TestBed.inject(ManageParticipantsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve participants', () => {
    const mockResponse: ParticipantsResponse = { message: '', data: [] };
    const groupId = 1;

    service.getParticipants(groupId).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.PARTICIPANTS_LIST(groupId)}`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle error response', () => {
    const groupId = 1;
    const mockErrorResponse = {
      error: { message: 'Erreur de serveur', details: "Détails de l'erreur" },
    };

    service.getParticipants(groupId).subscribe({
      next: () => fail('should have failed with 500 error'),
      error: (error: ParticipantsError) => {
        expect(error).toBeTruthy();
        expect(error.erros).toBeTrue();
        expect(error.message).toBe('Erreur de serveur');
      },
    });

    const req = httpMock.expectOne(
      `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.PARTICIPANTS_LIST(groupId)}`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockErrorResponse, { status: 500, statusText: 'Server Error' });
  });
});
