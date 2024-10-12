import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserInformationsComponent } from './user-informations.component';
import { UserUpdateService } from './service/user-update.service';
import { of, throwError } from 'rxjs';
import {
  UserInfoRessource,
  UpdateInfoUserResponseError,
} from '../../../constants/ressources/user/userInfoRessource';

describe('UserInformationsComponent', () => {
  let component: UserInformationsComponent;
  let fixture: ComponentFixture<UserInformationsComponent>;
  let updateService: UserUpdateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, UserInformationsComponent],
      providers: [
        {
          provide: UserUpdateService,
          useValue: {
            updateInfo: jest.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserInformationsComponent);
    component = fixture.componentInstance;
    updateService = TestBed.inject(UserUpdateService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should patch user info correctly', () => {
    const userInfo: UserInfoRessource = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      notification: true,
    };

    component.userInfo = userInfo;
    component.ngOnInit();

    expect(component.userFormInfo.value.first_name).toBe('John');
    expect(component.userFormInfo.value.last_name).toBe('Doe');
    expect(component.userFormInfo.value.email).toBe('john.doe@example.com');
    expect(component.userFormInfo.value.notification).toBe(true);
  });

  it('should detect form changes correctly', () => {
    const userInfo: UserInfoRessource = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      notification: false,
    };

    component.userInfo = userInfo;
    component.ngOnInit();
    component.userFormInfo.patchValue({
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'jane.doe@example.com',
      notification: true,
    });

    expect(component.isFormChange).toBe(true);
  });

  it('should submit form successfully', () => {
    const userInfo: UserInfoRessource = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      notification: false,
    };

    component.userInfo = userInfo;
    component.ngOnInit();
    component.userFormInfo.patchValue({
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'jane.doe@example.com',
      notification: true,
    });

    const mockResponse = {
      message: 'Utilisateur mis à jour avec succès',
    };

    jest.spyOn(updateService, 'updateInfo').mockReturnValue(of(mockResponse));

    component.onSubmit();

    expect(updateService.updateInfo).toHaveBeenCalled();
    expect(component.errorResponse).toBeNull();
    expect(component.isFormChange).toBe(false);
  });

  it('should handle error on submit', () => {
    const userInfo: UserInfoRessource = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      notification: false,
    };

    component.userInfo = userInfo;
    component.ngOnInit();
    component.userFormInfo.patchValue({
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'jane.doe@example.com',
      notification: true,
    });

    const mockErrorResponse: UpdateInfoUserResponseError = {
      errors: true,
      message: 'Erreur lors de la mise à jour.',
      details: {},
    };

    jest
      .spyOn(updateService, 'updateInfo')
      .mockReturnValue(throwError(() => mockErrorResponse));

    component.onSubmit();

    expect(updateService.updateInfo).toHaveBeenCalled();
    expect(component.errorResponse).toEqual(mockErrorResponse);
  });
});
