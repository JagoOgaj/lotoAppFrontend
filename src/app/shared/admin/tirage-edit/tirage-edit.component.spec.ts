import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TirageEditComponent } from './tirage-edit.component';

describe('TirageEditComponent', () => {
  let component: TirageEditComponent;
  let fixture: ComponentFixture<TirageEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TirageEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TirageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
