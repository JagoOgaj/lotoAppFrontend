import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserPlayComponent } from './user-play.component';
import { UserPlayServiceService } from './service/user-play-service.service';
import { UserSharedService } from '../service/user-shared.service';
import { UserHistoryService } from '../user-history/service/user-history.service';
import { of, Subject, throwError } from 'rxjs';
import {
  LotteryOverviewResponse,
  LotteryOverviewError,
} from '../../../constants/ressources/user/tirageUserRessource';

describe('UserPlayComponent', () => {
  let component: UserPlayComponent;
  let fixture: ComponentFixture<UserPlayComponent>;
  let userPlayService: jest.Mocked<UserPlayServiceService>;
  let userSharedService: jest.Mocked<UserSharedService>;
  let userHistoryService: jest.Mocked<UserHistoryService>;

  beforeEach(() => {
    userPlayService = {
      getCurentTirage: jest.fn(),
    } as any;
    userSharedService = {
      lotteryUpdate$: new Subject<void>(),
    } as any;
    userHistoryService = {
      getHistory: jest.fn(),
    } as any;

    TestBed.configureTestingModule({
      imports: [UserPlayComponent],
      providers: [
        { provide: UserPlayServiceService, useValue: userPlayService },
        { provide: UserSharedService, useValue: userSharedService },
        { provide: UserHistoryService, useValue: userHistoryService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserPlayComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load current lottery on initialization', () => {
    const mockLottery: LotteryOverviewResponse = {
      id: 1,
      name: 'Loterie Test',
      status: 'SIMULATION',
      reward_price: 100,
      participant_count: 10,
      max_participants: 100,
      end_date: '2024-10-12T12:00:00Z',
    };

    userPlayService.getCurentTirage.mockReturnValue(of(mockLottery));

    component.ngOnInit();

    expect(userPlayService.getCurentTirage).toHaveBeenCalled();
    expect(component.curentTirage).toEqual(mockLottery);
  });

  it('should handle error when loading current lottery', () => {
    const mockError: LotteryOverviewError = {
      errors: true,
      message: 'Erreur lors de la récupération du tirage',
    };

    userPlayService.getCurentTirage.mockReturnValue(
      throwError(() => mockError),
    );

    component.loadCurenTirage();

    expect(component.error).toEqual(mockError);
    expect(component.curentTirage).toBeNull();
  });

  it('should load user histories', () => {
    userHistoryService.getHistory.mockReturnValue(
      of({ message: '', data: [] }),
    ); // Simuler un retour vide

    component.loadUserHistories();

    expect(userHistoryService.getHistory).toHaveBeenCalled();
  });
});
