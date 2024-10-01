import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TirageOverviewComponent } from './tirage-overview.component';

describe('TirageOverviewComponent', () => {
  let component: TirageOverviewComponent;
  let fixture: ComponentFixture<TirageOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TirageOverviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TirageOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
