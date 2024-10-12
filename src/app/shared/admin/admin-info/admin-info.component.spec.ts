import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminInfoComponent } from './admin-info.component';
import { AdminInfoService } from './service/admin-info.service';
import { of, throwError } from 'rxjs';
import { AdminInfoResponse } from '../../../constants/ressources/admin/AdminInfoRessource';
import {
  UpdateInfoAdminResponseError,
  UpdateInfoAdminResponse,
} from '../../../constants/ressources/admin/AdminUpdateInfoRessource';

describe('AdminInfoComponent', () => {
  let component: AdminInfoComponent;
  let fixture: ComponentFixture<AdminInfoComponent>;
  let mockAdminInfoService: jest.Mocked<AdminInfoService>;

  const mockAdminInfo: AdminInfoResponse = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
  };

  beforeEach(() => {
    mockAdminInfoService = {
      updateAdminInfo: jest.fn(),
    } as unknown as jest.Mocked<AdminInfoService>;

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AdminInfoComponent],
      providers: [
        { provide: AdminInfoService, useValue: mockAdminInfoService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminInfoComponent);
    component = fixture.componentInstance;
    component.adminInfo = mockAdminInfo;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with admin info', () => {
    expect(component.adminFormInfo.value).toEqual({
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
    });
  });

  it('should emit updateParent event on successful update', () => {
    const mockResponse: UpdateInfoAdminResponse = {
      message: 'Update successful',
    };

    mockAdminInfoService.updateAdminInfo.mockReturnValue(of(mockResponse));
    const emitSpy = jest.spyOn(component.updateParent, 'emit');

    component.onSubmit();

    expect(mockAdminInfoService.updateAdminInfo).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalled();
    expect(component.errorResponse).toBeNull();
  });

  it('should handle error on update failure', () => {
    const mockError: UpdateInfoAdminResponseError = {
      errors: true,
      message: 'Update failed',
      details: {},
    };
    mockAdminInfoService.updateAdminInfo.mockReturnValue(
      throwError(() => mockError),
    );

    component.onSubmit();

    expect(component.errorResponse).toEqual(mockError);
  });

  it('should check if form is changed', () => {
    component.adminFormInfo.patchValue({
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'jane.doe@example.com',
    });
    component.checkIfFormIsChanged();
    expect(component.isFormChange).toBeTruthy();
  });
});
