import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSharedComponent } from './hero-shared.component';

describe('HeroSharedComponent', () => {
  let component: HeroSharedComponent;
  let fixture: ComponentFixture<HeroSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroSharedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
