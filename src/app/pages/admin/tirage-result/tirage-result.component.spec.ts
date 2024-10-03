import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TirageResultComponent } from './tirage-result.component';

describe('TirageResultComponent', () => {
  let component: TirageResultComponent;
  let fixture: ComponentFixture<TirageResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TirageResultComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TirageResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
