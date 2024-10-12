import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ParticipantsListComponent } from './participants-list.component';
import { ParticipantsListService } from './service/participants-list.service';
import { of, throwError } from 'rxjs';
import { LotteryOverviewResponse } from '../../../constants/ressources/user/tirageUserRessource';
import {
  ParticipantRessource,
  Participants,
} from '../../../constants/ressources/admin/AdminParticipantsRessource';

describe('ParticipantsListComponent', () => {
  let component: ParticipantsListComponent;
  let fixture: ComponentFixture<ParticipantsListComponent>;
  let mockParticipantsService: jest.Mocked<ParticipantsListService>;

  beforeEach(async () => {
    mockParticipantsService = {
      addParticipant: jest.fn(),
      populateFakeUser: jest.fn(),
      removeParticipant: jest.fn(),
    } as unknown as jest.Mocked<ParticipantsListService>;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ParticipantsListComponent],
      providers: [
        { provide: ParticipantsListService, useValue: mockParticipantsService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ParticipantsListComponent);
    component = fixture.componentInstance;
    component.tirage = {
      id: 1,
      name: 'Loterie Exemple',
      start_date: undefined,
      end_date: undefined,
      status: 'EN_COURS',
      reward_price: 1000,
      max_participants: 5,
      participant_count: 0,
    } as LotteryOverviewResponse;

    component.participants = [
      {
        user_id: 1,
        user_name: 'John Doe',
        email: 'john@example.com',
        numbers: '1,2,3,4,5',
        lucky_numbers: '1,2',
      },
    ] as Participants;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize pagination on ngOnInit', () => {
    component.ngOnInit();
    expect(component.totalPages).toBe(1);
    expect(component.paginatedParticipants).toEqual([
      {
        user_id: 1,
        user_name: 'John Doe',
        email: 'john@example.com',
        numbers: '1,2,3,4,5',
        lucky_numbers: '1,2',
      },
    ]);
  });

  it('should update pagination when participants change', () => {
    const simpleChange = {
      currentValue: component.participants,
      previousValue: null,
      firstChange: true,
      isFirstChange: () => true,
    };

    component.ngOnChanges({
      participants: simpleChange,
    });

    expect(component.newUser.value).toEqual({
      user_name: null,
      email: null,
      numbers: { num1: null, num2: null, num3: null, num4: null, num5: null },
      lucky_numbers: { lucky1: null, lucky2: null },
    });
  });

  it('should submit form if valid', () => {
    mockParticipantsService.addParticipant.mockReturnValue(
      of({ message: '', entry_id: 1 }),
    );
    component.newUser.setValue({
      user_name: 'John Doe',
      email: 'john@example.com',
      numbers: { num1: 1, num2: 2, num3: 3, num4: 4, num5: 5 },
      lucky_numbers: { lucky1: 1, lucky2: 2 },
    });
    component.submitForm();
    expect(mockParticipantsService.addParticipant).toHaveBeenCalled();
  });

  it('should handle errors when submitting form', () => {
    const errorResponse = { errors: true, message: 'Error', details: {} };
    mockParticipantsService.addParticipant.mockReturnValue(
      throwError(() => errorResponse),
    );
    component.newUser.setValue({
      user_name: 'John Doe',
      email: 'john@example.com',
      numbers: { num1: 1, num2: 2, num3: 3, num4: 4, num5: 5 },
      lucky_numbers: { lucky1: 1, lucky2: 2 },
    });
    component.submitForm();
    expect(component.backendErrors).toEqual(errorResponse);
  });

  it('should populate a fake user', () => {
    mockParticipantsService.populateFakeUser.mockReturnValue(
      of({ message: '', total_participants: 0 }),
    );
    component.populateFakeUser(1);
    expect(mockParticipantsService.populateFakeUser).toHaveBeenCalledWith(1);
  });

  it('should confirm delete of selected user', () => {
    mockParticipantsService.removeParticipant.mockReturnValue(
      of({ message: '' }),
    );
    component.selectedUser = {
      user_id: 1,
      user_name: 'John Doe',
      email: 'john@example.com',
      numbers: '1,2,3,4,5',
      lucky_numbers: '1,2',
    } as ParticipantRessource;
    component.confirmDelete();
    expect(mockParticipantsService.removeParticipant).toHaveBeenCalled();
  });

  it('should not confirm delete if no user selected', () => {
    component.selectedUser = null;
    component.confirmDelete();
    expect(mockParticipantsService.removeParticipant).not.toHaveBeenCalled();
  });
});
