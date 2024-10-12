import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TirageOverviewComponent } from './tirage-overview.component';
import { LotteryOverviewResponse } from '../../../constants/ressources/user/tirageUserRessource';
import { TirageStatus } from '../../../constants/tirageStatus/tirageStatus.constants';
import { RouterTestingModule } from '@angular/router/testing';

describe('TirageOverviewComponent', () => {
  let component: TirageOverviewComponent;
  let fixture: ComponentFixture<TirageOverviewComponent>;
  let mockRouter: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, TirageOverviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TirageOverviewComponent);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router);
    component.tirage = {
      id: 1,
    } as LotteryOverviewResponse;
    fixture.detectChanges();
  });

  it('devrait naviguer vers les détails du tirage lorsque showDetails est appelé', () => {
    const navigateSpy = jest.spyOn(mockRouter, 'navigate');
    component.showDetails();
    expect(navigateSpy).toHaveBeenCalledWith([
      '/admin/tirage-details',
      component.tirage.id,
    ]);
  });

  it('devrait retourner "En cours" pour le statut EN_COUR', () => {
    expect(component.renderStatusToTemplate(TirageStatus.EN_COUR)).toBe(
      'En cours',
    );
  });

  it('devrait retourner "Termine" pour le statut TERMINE', () => {
    expect(component.renderStatusToTemplate(TirageStatus.TERMINE)).toBe(
      'Termine',
    );
  });

  it('devrait retourner une chaîne vide pour un statut inconnu', () => {
    expect(component.renderStatusToTemplate('unknown')).toBe('');
  });
});
