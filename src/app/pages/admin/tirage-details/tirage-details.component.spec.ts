import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TirageDetailsComponent } from './tirage-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LotteryInfoAdminResponse } from '../../../constants/ressources/admin/LotteryInfoRessource';
import { UpdateLotteryResponse } from '../../../constants/ressources/admin/AdminUpdateLottery';
import { FormBuilder } from '@angular/forms';
import { AdminSharedService } from '../service/admin-shared.service';

describe('TirageDetailsComponent', () => {
  let component: TirageDetailsComponent;
  let fixture: ComponentFixture<TirageDetailsComponent>;
  let adminService: jest.Mocked<AdminSharedService>;
  let router: jest.Mocked<Router>;

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

  beforeEach(async () => {
    adminService = {
      getTirageDetails: jest.fn(),
      updateTirage: jest.fn(),
      updateTirageToDone: jest.fn(),
    } as unknown as jest.Mocked<AdminSharedService>;

    router = {
      navigate: jest.fn().mockReturnValue(Promise.resolve(true)),
    } as unknown as jest.Mocked<Router>;

    await TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: AdminSharedService, useValue: adminService },
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        FormBuilder,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TirageDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should handle error when loading tirage details', () => {
    adminService.getTirageDetails.mockReturnValue(
      throwError(() => new Error('Erreur de tirage')),
    );

    component.ngOnInit();

    expect(component.serverErrors).toEqual({
      message: '',
      errors: true,
      details: {},
    });
  });

  it('should handle server errors when saving changes', () => {
    component.updateTirageForm.patchValue({
      name: 'Updated Lottery',
      reward_price: 1500,
    });

    adminService.updateTirage.mockReturnValue(
      throwError(() => new Error('Erreur de sauvegarde')),
    );

    component.saveChanges();

    expect(component.serverErrors).toEqual({
      message: '',
      errors: true,
      details: {},
    });
  });

  it('should navigate to the expected route on successful save', async () => {
    component.updateTirageForm.patchValue({
      name: 'Updated Lottery',
      reward_price: 1500,
    });

    const updateResponse: UpdateLotteryResponse = {
      message: 'Update successful',
    };

    adminService.updateTirage.mockReturnValue(of(updateResponse));

    await component.saveChanges();
    if (component.tirageId) {
      expect(router.navigate).toHaveBeenCalledWith([
        '/admin/tirage-result',
        component.tirageId,
      ]);
    }
  });
});
