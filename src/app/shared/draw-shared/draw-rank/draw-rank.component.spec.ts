import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { DrawRankComponent } from './draw-rank.component';
import { DrawRankService } from './service/draw-rank.service';
import { of } from 'rxjs';

describe('DrawRankComponent', () => {
  let component: DrawRankComponent;
  let fixture: ComponentFixture<DrawRankComponent>;
  let drawRankService: DrawRankService;
  let activatedRoute: ActivatedRoute;

  beforeEach(() => {
    const drawRankServiceMock = {
      getRankTirage: jest.fn(),
    };

    const activatedRouteMock = {
      snapshot: {
        paramMap: {
          get: jest.fn(),
        },
      },
    };

    TestBed.configureTestingModule({
      imports: [DrawRankComponent],
      providers: [
        { provide: DrawRankService, useValue: drawRankServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    });

    fixture = TestBed.createComponent(DrawRankComponent);
    component = fixture.componentInstance;
    drawRankService = TestBed.inject(DrawRankService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load the ranking if an ID is present in the URL', () => {
    const mockId = '1';
    activatedRoute.snapshot.paramMap.get = jest.fn().mockReturnValue(mockId);
    drawRankService.getRankTirage = jest
      .fn()
      .mockReturnValue(of({ data: [], currentUser: undefined }));

    component.ngOnInit();

    expect(drawRankService.getRankTirage).toHaveBeenCalledWith(+mockId);
  });

  it('should return the paginated players', () => {
    component.players = [
      { name: 'Player 1', rank: 1, winnings: 200, score: 100 },
      { name: 'Player 2', rank: 2, winnings: 100, score: 50 },
      { name: 'Player 3', rank: 3, winnings: 50, score: 40 },
      { name: 'Player 4', rank: 4, winnings: 40, score: 30 },
    ];
    component.currentPage = 1;
    component.itemsPerPage = 2;

    const paginatedPlayers = component.getPaginatedPlayers();

    expect(paginatedPlayers.length).toBe(2);
    expect(paginatedPlayers[0].name).toBe('Player 1');
  });

  it('should calculate the total number of pages', () => {
    component.players = new Array(25);
    expect(component.totalPages).toBe(3);
  });

  it('should go to the specified page', () => {
    component.players = [
      { name: 'Player 1', rank: 1, winnings: 200, score: 100 },
      { name: 'Player 2', rank: 2, winnings: 100, score: 50 },
      { name: 'Player 3', rank: 3, winnings: 50, score: 40 },
      { name: 'Player 4', rank: 4, winnings: 40, score: 30 },
    ];
    component.itemsPerPage = 1;
    component.goToPage(2);
    expect(component.currentPage).toBe(2);
  });

  it('should not change the page if the specified page is invalid', () => {
    component.goToPage(0);
    expect(component.currentPage).toBe(1);
    component.goToPage(4);
    expect(component.currentPage).toBe(1);
  });

  it('should check if the current user is on the current page', () => {
    component.currentUser = {
      name: 'Player 1',
      rank: 1,
      winnings: 200,
      score: 100,
    };
    component.players = [
      { name: 'Player 1', rank: 1, winnings: 200, score: 100 },
      { name: 'Player 2', rank: 2, winnings: 100, score: 50 },
    ];
    expect(component.isCurrentUserOnCurrentPage()).toBe(true);

    component.currentUser = {
      name: 'Player 3',
      rank: 3,
      winnings: 10,
      score: 10,
    };
    expect(component.isCurrentUserOnCurrentPage()).toBe(false);
  });

  it('should round a reward to two decimal places', () => {
    expect(component.roundReward(10.123)).toBe(10.12);
    expect(component.roundReward(10)).toBe(10);
  });
});
