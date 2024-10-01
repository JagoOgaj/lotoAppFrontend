import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountdownTimerCardComponent } from './countdown-timer-card.component';

describe('CountdownTimerCardComponent', () => {
  let component: CountdownTimerCardComponent;
  let fixture: ComponentFixture<CountdownTimerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountdownTimerCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CountdownTimerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
