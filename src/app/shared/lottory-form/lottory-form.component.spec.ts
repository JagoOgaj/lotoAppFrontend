import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LottoryFormComponent } from './lottory-form.component';
import { UserPlayServiceService } from '../user/user-play/service/user-play-service.service';

describe('LottoryFormComponent', () => {
  let component: LottoryFormComponent;
  let fixture: ComponentFixture<LottoryFormComponent>;
  let userPlayService: UserPlayServiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule, LottoryFormComponent],
      providers: [{ provide: UserPlayServiceService }],
    }).compileComponents();

    fixture = TestBed.createComponent(LottoryFormComponent);
    component = fixture.componentInstance;
    userPlayService = TestBed.inject(UserPlayServiceService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
