import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TirageDetailsComponent } from './tirage-details.component';

describe('TirageDetailsComponent', () => {
  let component: TirageDetailsComponent;
  let fixture: ComponentFixture<TirageDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TirageDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TirageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
