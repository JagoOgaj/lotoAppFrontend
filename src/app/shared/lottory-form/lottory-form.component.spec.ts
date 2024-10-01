import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LottoryFormComponent } from './lottory-form.component';

describe('LottoryFormComponent', () => {
  let component: LottoryFormComponent;
  let fixture: ComponentFixture<LottoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LottoryFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LottoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
