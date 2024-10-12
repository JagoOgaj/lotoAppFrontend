import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { TirageListSharedComponent } from './tirage-list-shared.component';
import { TirageListSharedService } from './service/tirage-list-shared.service';

describe('TirageListSharedComponent', () => {
  let component: TirageListSharedComponent;
  let fixture: ComponentFixture<TirageListSharedComponent>;
  let tirageListService: jest.Mocked<TirageListSharedService>;
  let router: jest.Mocked<Router>;

  beforeEach(() => {
    tirageListService = {
      deleteTirage: jest.fn(),
      createTirage: jest.fn(),
    } as any;

    router = {
      navigate: jest.fn(),
    } as any;

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TirageListSharedComponent],
      providers: [
        { provide: TirageListSharedService, useValue: tirageListService },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TirageListSharedComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.searchTerm).toBe('');
    expect(component.currentPage).toBe(1);
    expect(component.itemsPerPage).toBe(4);
    expect(component.totalPages).toBe(0);
    expect(component.paginatedTirages).toEqual([]);
    expect(component.showDateFields).toBe(true);
  });

  it('should filter tirages based on searchTerm', () => {
    component.tirages = [
      {
        id: 1,
        name: 'A',
        start_date: '2024-01-01T00:00:00Z',
        end_date: '2024-01-15T00:00:00Z',
        status: 'EN_COUR',
        reward_price: 10000,
        max_participants: 100,
        participant_count: 50,
      },
      {
        id: 2,
        name: 'B',
        start_date: '2024-02-01T00:00:00Z',
        end_date: '2024-02-15T00:00:00Z',
        status: 'TERMINE',
        reward_price: 5000,
        max_participants: 50,
        participant_count: 50,
      },
    ];
    component.searchTerm = 'A';
    component.filterTirages();
    expect(component.paginatedTirages).toEqual([
      {
        id: 1,
        name: 'A',
        start_date: '2024-01-01T00:00:00Z',
        end_date: '2024-01-15T00:00:00Z',
        status: 'EN_COUR',
        reward_price: 10000,
        max_participants: 100,
        participant_count: 50,
      },
    ]);
  });

  it('should handle pagination', () => {
    component.tirages = new Array(10).fill({
      id: 0,
      name: 'Tirage',
      status: 'EN_COUR',
      start_date: '2024-01-01T00:00:00Z',
      end_date: '2024-01-15T00:00:00Z',
      reward_price: 100,
      max_participants: 100,
      participant_count: 50,
    });
    component.itemsPerPage = 2;
    component.updatePagination();
    expect(component.totalPages).toBe(5);
    expect(component.paginatedTirages.length).toBe(2);
  });

  it('should navigate to details page', () => {
    component.viewDetails(1);
    expect(router.navigate).toHaveBeenCalledWith(['/admin/tirage-details', 1]);
  });

  it('should call deleteTirage service on deleteTirage', () => {
    tirageListService.deleteTirage.mockReturnValue(of({ message: '' }));
    component.idTirageToDelete = 1;
    component.deleteTirage();
    expect(tirageListService.deleteTirage).toHaveBeenCalledWith(1);
  });

  it('should emit updateParent event on successful delete', () => {
    tirageListService.deleteTirage.mockReturnValue(of({ message: '' }));
    jest.spyOn(component.updateParent, 'emit');
    component.idTirageToDelete = 1;
    component.deleteTirage();
    expect(component.updateParent.emit).toHaveBeenCalled();
  });

  it('should handle form creation for a new tirage', () => {
    component.newTirage.setValue({
      name: 'Tirage Test',
      status: 'EN_COUR',
      reward_price: 100,
      max_participants: 10,
      start_date: new Date(),
      end_date: new Date(),
    });
    tirageListService.createTirage.mockReturnValue(of({ message: '' }));
    jest.spyOn(component.updateParent, 'emit');
    component.createTirage();
    expect(tirageListService.createTirage).toHaveBeenCalled();
    expect(component.updateParent.emit).toHaveBeenCalled();
  });
});
