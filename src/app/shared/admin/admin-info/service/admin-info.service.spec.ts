import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AdminInfoService } from './admin-info.service';
import {
  UpdateInfoAdmin,
  UpdateInfoAdminResponse,
  UpdateInfoAdminResponseError,
} from '../../../../constants/ressources/admin/AdminUpdateInfoRessource';
import { ApiAdmin } from '../../../../config/api-admin';

describe('AdminInfoService', () => {
  let service: AdminInfoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdminInfoService],
    });

    service = TestBed.inject(AdminInfoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('updateAdminInfo', () => {
    it('should update admin info and return response', () => {
      const mockData: UpdateInfoAdmin = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
      };

      const mockResponse: UpdateInfoAdminResponse = {
        message: 'Admin information updated successfully',
      };

      service.updateAdminInfo(mockData).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(
        `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.UPDATE_INFO}`,
      );
      expect(req.request.method).toBe('PUT');
      req.flush(mockResponse);
    });

    it('should handle error response correctly', () => {
      const mockData: UpdateInfoAdmin = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
      };

      const mockErrorResponse = {
        errors: true,
        message: 'Invalid data',
        details: {
          first_name: 'First name is required',
        },
      };

      service.updateAdminInfo(mockData).subscribe({
        next: () => fail('should have failed with a 400 error'),
        error: (error: UpdateInfoAdminResponseError) => {
          expect(error.errors).toBe(true);
          expect(error.message).toEqual('Invalid data');
          expect(error.details?.first_name).toEqual(['First name is required']);
        },
      });

      const req = httpMock.expectOne(
        `${ApiAdmin.BASE_URL}${ApiAdmin.ENDPOINT.UPDATE_INFO}`,
      );
      expect(req.request.method).toBe('PUT');
      req.flush(mockErrorResponse, { status: 400, statusText: 'Bad Request' });
    });
  });
});
