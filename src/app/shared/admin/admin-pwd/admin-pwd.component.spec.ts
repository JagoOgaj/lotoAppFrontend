import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPwdComponent } from './admin-pwd.component';

describe('AdminPwdComponent', () => {
  let component: AdminPwdComponent;
  let fixture: ComponentFixture<AdminPwdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPwdComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
