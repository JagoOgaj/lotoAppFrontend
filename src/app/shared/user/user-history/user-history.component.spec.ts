import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { UserHistoryComponent } from './user-history.component';
import { UserHistoryService } from './service/user-history.service';
import { UserSharedService } from '../service/user-shared.service';
import { of } from 'rxjs';
import { LotteryHistories } from '../../../constants/ressources/user/tirageUserRessource';

class MockUserHistoryService {
  getHistory = jest.fn().mockReturnValue(of({ data: [] }));
}

class MockRouter {
  navigate = jest.fn();
}

class MockUserSharedService {
  lotteryUpdate$ = of();
}

describe('UserHistoryComponent', () => {
  let component: UserHistoryComponent;
  let fixture: ComponentFixture<UserHistoryComponent>;
  let userHistoryService: UserHistoryService;
  let router: Router;
  let userSharedService: UserSharedService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserHistoryComponent],
      providers: [
        { provide: UserHistoryService, useClass: MockUserHistoryService },
        { provide: Router, useClass: MockRouter },
        { provide: UserSharedService, useClass: MockUserSharedService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserHistoryComponent);
    component = fixture.componentInstance;
    userHistoryService = TestBed.inject(UserHistoryService);
    router = TestBed.inject(Router);
    userSharedService = TestBed.inject(UserSharedService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load histories on initialization', () => {
    const loadHistoriesSpy = jest.spyOn(component, 'loadHistories');
    component.ngOnInit();
    expect(loadHistoriesSpy).toHaveBeenCalled();
  });

  it('should paginate correctly', () => {
    const mockHistories: LotteryHistories = Array.from(
      { length: 10 },
      (_, i) => ({
        id: i + 1,
        name: `Loterie ${i + 1}`,
        date: new Date().toISOString(),
        statut: 'terminée',
        numerosJoues: '1, 2, 3, 4, 5',
        numerosChance: '1, 3',
        dateTirage: new Date().toISOString(),
      }),
    );

    jest.spyOn(userHistoryService, 'getHistory').mockReturnValue(
      of({
        message: 'Historique récupéré avec succès',
        data: mockHistories,
      }),
    );

    component.loadHistories();

    expect(component.histories).toEqual(mockHistories);

    component.updatePagination();

    expect(component.totalPages).toBe(4);
    expect(component.pages.length).toBe(4);
    expect(component.paginatedParties.length).toBe(3);

    component.goToPage(2);
    expect(component.currentPage).toBe(2);
    expect(component.paginatedParties.length).toBe(3);
  });

  it('should navigate to draw details', () => {
    const id = 1;
    component.voirDetailsTirage(id);
    expect(router.navigate).toHaveBeenCalledWith(['/draw', id]);
  });

  it('should not navigate to draw details if id is falsy', () => {
    component.voirDetailsTirage(0);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should render status correctly', () => {
    expect(component.renderStatusToTemplate('EN_COUR')).toBe('En cours');
    expect(component.renderStatusToTemplate('EN_VALIDATION')).toBe(
      'En validation',
    );
    expect(component.renderStatusToTemplate('TERMINE')).toBe('Termine');
    expect(component.renderStatusToTemplate('UNKNOWN')).toBe('');
  });

  it('should check if details can be shown', () => {
    expect(component.canShowDetails('TERMINE')).toBe(true);
    expect(component.canShowDetails('EN_COUR')).toBe(false);
  });
});
