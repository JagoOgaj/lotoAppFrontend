import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawRankComponent } from './draw-rank.component';

describe('DrawRankComponent', () => {
  let component: DrawRankComponent;
  let fixture: ComponentFixture<DrawRankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawRankComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DrawRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
