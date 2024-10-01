import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TirageListComponent } from './tirage-list.component';

describe('TirageListComponent', () => {
  let component: TirageListComponent;
  let fixture: ComponentFixture<TirageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TirageListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TirageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
