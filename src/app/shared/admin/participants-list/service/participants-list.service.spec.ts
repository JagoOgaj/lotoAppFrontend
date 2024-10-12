import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ParticipantsListService } from './participants-list.service';
import { ApiAdmin } from '../../../../config/api-admin';
import {
  ManageRemoveParticipant,
  AddParticipantRessource,
} from '../../../../constants/ressources/admin/AdminManageParticipantsRessource';

describe('ParticipantsListService', () => {
  let service: ParticipantsListService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ParticipantsListService],
    });

    service = TestBed.inject(ParticipantsListService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('removeParticipant', () => {
    it('should successfully remove a participant', () => {
      const participantData: ManageRemoveParticipant = {
        lottery_id: 1,
        user_id: 1,
      };

      service.removeParticipant(participantData).subscribe((response: any) => {
        expect(response).toEqual({
          message: 'Participant supprimé avec succès',
        });
      });

      const req = httpMock.expectOne(
        `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.MANAGE_PARTICIPANTS_REMOVE}`,
      );
      expect(req.request.method).toBe('DELETE');
      req.flush({ message: 'Participant supprimé avec succès' });
    });

    it('should handle error response', () => {
      const participantData: ManageRemoveParticipant = {
        lottery_id: 1,
        user_id: 1,
      };

      service.removeParticipant(participantData).subscribe({
        next: () => fail('should have failed with 400 error'),
        error: (error: any) => {
          expect(error).toEqual({
            errors: true,
            message: "Erreur dans la supression de l'utilisateur",
            details: "Erreur dans la supression de l'utilisateur",
          });
        },
      });

      const req = httpMock.expectOne(
        `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.MANAGE_PARTICIPANTS_REMOVE}`,
      );
      expect(req.request.method).toBe('DELETE');
      req.flush(
        { message: "Erreur dans la supression de l'utilisateur" },
        { status: 400, statusText: 'Bad Request' },
      );
    });
  });

  describe('addParticipant', () => {
    it('should successfully add a participant', () => {
      const participantData: AddParticipantRessource = {
        user_name: 'John Doe',
        email: 'john@example.com',
        numbers: '1,2,3',
        numbers_lucky: '7,8',
      };
      const id = 1;

      service.addParticipant(participantData, id).subscribe((response: any) => {
        expect(response).toEqual({
          message: 'Participant ajouté avec succès',
          entry_id: 123,
        });
      });

      const req = httpMock.expectOne(
        `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.MANAGE_PARTICIPANTS_ADD(id)}`,
      );
      expect(req.request.method).toBe('PUT');
      req.flush({
        message: 'Participant ajouté avec succès',
        entry_id: 123,
      });
    });

    it('should handle error response', () => {
      const participantData: AddParticipantRessource = {
        user_name: 'John Doe',
        email: 'john@example.com',
        numbers: '1,2,3',
        numbers_lucky: '7,8',
      };
      const id = 1;

      service.addParticipant(participantData, id).subscribe({
        next: () => fail('should have failed with 400 error'),
        error: (error: any) => {
          expect(error).toEqual({
            errors: true,
            message: "Une erreur est survenu dans l'ajout d'un utilisateur",
            details: {
              numbers: null,
              lucky_numbers: null,
              email: null,
              user_name: null,
            },
          });
        },
      });

      const req = httpMock.expectOne(
        `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.MANAGE_PARTICIPANTS_ADD(id)}`,
      );
      expect(req.request.method).toBe('PUT');
      req.flush(
        { message: "Une erreur est survenu dans l'ajout d'un utilisateur" },
        { status: 400, statusText: 'Bad Request' },
      );
    });
  });

  describe('populateFakeUser', () => {
    it('should successfully populate a fake user', () => {
      const id = 1;

      service.populateFakeUser(id).subscribe((response: any) => {
        expect(response).toEqual({
          message: 'Utilisateur fictif peuplé avec succès',
          total_participants: 5,
        });
      });

      const req = httpMock.expectOne(
        `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.POPULATE_FAKE_USER(id)}`,
      );
      expect(req.request.method).toBe('POST');
      req.flush({
        message: 'Utilisateur fictif peuplé avec succès',
        total_participants: 5,
      });
    });

    it('should handle error response', () => {
      const id = 1;

      service.populateFakeUser(id).subscribe({
        next: () => fail('should have failed with 400 error'),
        error: (error: any) => {
          expect(error).toEqual({
            erros: true,
            message:
              'Une erreur est survenu lors du remplissage automatique du tirage',
            details:
              'Une erreur est survenu lors du remplissage automatique du tirage',
          });
        },
      });

      const req = httpMock.expectOne(
        `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.POPULATE_FAKE_USER(id)}`,
      );
      expect(req.request.method).toBe('POST');
      req.flush(
        {
          message:
            'Une erreur est survenu lors du remplissage automatique du tirage',
        },
        { status: 400, statusText: 'Bad Request' },
      );
    });
  });
});
