import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TirageListSharedComponent } from './tirage-list-shared.component';

describe('TirageListSharedComponent', () => {
  let component: TirageListSharedComponent;
  let fixture: ComponentFixture<TirageListSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TirageListSharedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TirageListSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
