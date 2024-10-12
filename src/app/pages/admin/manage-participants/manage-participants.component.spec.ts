import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageParticipantsComponent } from './manage-participants.component';
import { ActivatedRoute } from '@angular/router';
import { AdminSharedService } from '../service/admin-shared.service';
import { ManageParticipantsService } from './service/manage-participants.service';
import { of, throwError } from 'rxjs';
import { LotteryOverviewResponse } from '../../../constants/ressources/user/tirageUserRessource';
import { Participants } from '../../../constants/ressources/admin/AdminParticipantsRessource';

describe('ManageParticipantsComponent', () => {
  let component: ManageParticipantsComponent;
  let fixture: ComponentFixture<ManageParticipantsComponent>;
  let adminService: jest.Mocked<AdminSharedService>;
  let manageParticipantsService: jest.Mocked<ManageParticipantsService>;

  const mockParamMap = {
    get: (key: string) => (key === 'id' ? '1' : null),
    has: (key: string) => key === 'id',
    keys: ['id'],
  };

  const mockActivatedRoute = {
    snapshot: {
      paramMap: mockParamMap,
    },
  };

  beforeEach(() => {
    adminService = {
      getTirageDetails: jest.fn(),
    } as unknown as jest.Mocked<AdminSharedService>;

    manageParticipantsService = {
      getParticipants: jest.fn(),
    } as unknown as jest.Mocked<ManageParticipantsService>;

    TestBed.configureTestingModule({
      imports: [ManageParticipantsComponent],
      providers: [
        { provide: AdminSharedService, useValue: adminService },
        {
          provide: ManageParticipantsService,
          useValue: manageParticipantsService,
        },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    });

    fixture = TestBed.createComponent(ManageParticipantsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load tirage and participants on init', () => {
    const mockTirageResponse: LotteryOverviewResponse = {
      id: 1,
      name: 'Loterie de Noël',
      start_date: '2023-12-01T00:00:00Z',
      end_date: '2023-12-24T23:59:59Z',
      status: 'active',
      reward_price: 10000,
      max_participants: 100,
      participant_count: 50,
    };

    const mockParticipantsResponse: Participants = [];

    adminService.getTirageDetails.mockReturnValue(
      of({ message: 'Success', data: mockTirageResponse }),
    );
    manageParticipantsService.getParticipants.mockReturnValue(
      of({ message: 'Success', data: mockParticipantsResponse }),
    );

    component.ngOnInit();

    expect(component.idTirage).toBe(1);
    expect(adminService.getTirageDetails).toHaveBeenCalledWith(1);
    expect(manageParticipantsService.getParticipants).toHaveBeenCalledWith(1);
    expect(component.tirage).toEqual(mockTirageResponse);
    expect(component.participants).toEqual(mockParticipantsResponse);
  });

  it('should handle error when loading tirage', () => {
    manageParticipantsService.getParticipants.mockReturnValue(
      of({ message: 'No participants', data: [] }),
    );
    adminService.getTirageDetails.mockReturnValue(
      throwError(() => new Error('Erreur de tirage')),
    );

    component.ngOnInit();

    expect(component.tirage).toBeUndefined();
    expect(component.participants).toEqual([]);
  });

  it('should call loadTirage and loadParticipants on update', () => {
    const mockLoadTirageResponse = { message: 'Success', data: {} };
    const mockLoadParticipantsResponse = { message: 'Success', data: [] };

    const loadTirageSpy = jest
      .spyOn(component, 'loadTirage')
      .mockImplementation(() => {
        return of(mockLoadTirageResponse);
      });

    const loadParticipantsSpy = jest
      .spyOn(component, 'loadParticipants')
      .mockImplementation(() => {
        return of(mockLoadParticipantsResponse);
      });

    component.idTirage = 1;

    component.onUpdate();

    expect(loadTirageSpy).toHaveBeenCalledWith(1);
    expect(loadParticipantsSpy).toHaveBeenCalledWith(1);
  });
});
