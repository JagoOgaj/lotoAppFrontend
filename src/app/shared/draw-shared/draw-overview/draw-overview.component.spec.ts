import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawOverviewComponent } from './draw-overview.component';

describe('DrawOverviewComponent', () => {
  let component: DrawOverviewComponent;
  let fixture: ComponentFixture<DrawOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
