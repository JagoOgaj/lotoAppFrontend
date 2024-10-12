import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DrawComponent } from './draw.component';
import { DrawService } from './service/draw.service';
import { Observable, of, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LotteryInfoResponse } from '../../constants/ressources/user/LotteryInfoRessource';
import {
  LotteryOverviewResponse,
  LotteryResultReponse,
} from '../../constants/ressources/user/tirageUserRessource';

const mockResponse: LotteryInfoResponse = {
  message: 'Tirage récupéré avec succès.',
  data: {
    id: 1,
    name: 'Loterie Nationale',
    start_date: '2024-10-01T00:00:00Z',
    end_date: '2024-10-31T23:59:59Z',
    status: 'active',
    reward_price: 1000000,
    max_participants: 10000,
    participant_count: 5000,
  } as LotteryOverviewResponse,
  numbers: {
    winning_numbers: '5, 12, 23, 34, 45',
    lucky_numbers: '3, 7, 21',
  } as LotteryResultReponse,
};

type DrawServiceMock = {
  getTirageOverview: jest.Mock<Observable<LotteryInfoResponse>>;
};

describe('DrawComponent', () => {
  let component: DrawComponent;
  let fixture: ComponentFixture<DrawComponent>;
  let drawService: DrawServiceMock;

  beforeEach(async () => {
    window.scrollTo = jest.fn();

    drawService = {
      getTirageOverview: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [DrawComponent],
      providers: [
        { provide: DrawService, useValue: drawService },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DrawComponent);
    component = fixture.componentInstance;
  });

  it('devrait initialiser le composant et charger les informations de tirage', () => {
    drawService.getTirageOverview.mockReturnValue(of(mockResponse));

    component.ngOnInit();

    expect(drawService.getTirageOverview).toHaveBeenCalledWith(1);
    expect(component.tirageOverview).toEqual(mockResponse.data);
    expect(component.results).toEqual(mockResponse.numbers);
  });

  it('devrait gérer les erreurs lors du chargement des informations du tirage', () => {
    const errorResponse =
      'Erreur lors du chargement des informations du tirage';

    drawService.getTirageOverview.mockReturnValue(
      throwError(() => errorResponse),
    );

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    component.ngOnInit();

    expect(drawService.getTirageOverview).toHaveBeenCalledWith(1);

    consoleErrorSpy.mockRestore();
  });
});
