import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPlayComponent } from './user-play.component';

describe('UserPlayComponent', () => {
  let component: UserPlayComponent;
  let fixture: ComponentFixture<UserPlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
