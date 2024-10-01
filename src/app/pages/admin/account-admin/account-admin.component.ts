import { Component, OnInit } from '@angular/core';
import { AdminInfoComponent } from '../../../shared/admin/admin-info/admin-info.component';
import { AdminPwdComponent } from '../../../shared/admin/admin-pwd/admin-pwd.component';
import { AdminInfoResponse } from '../../../constants/ressources/admin/AdminInfoRessource';
import { AcountAdminService } from './service/acount-admin.service';
import { AuthService } from '../../../core/service/auth.service';

@Component({
  selector: 'app-account-admin',
  standalone: true,
  imports: [AdminInfoComponent, AdminPwdComponent],
  templateUrl: './account-admin.component.html',
  styleUrl: './account-admin.component.css',
})
export class AccountAdminComponent implements OnInit {
  adminInfo: AdminInfoResponse;

  constructor(
    private adminAccountService: AcountAdminService,
    private authService: AuthService,
  ) {
    this.adminInfo = {} as AdminInfoResponse;
  }

  ngOnInit(): void {
    this.loadAdminInfo();
  }

  loadAdminInfo(): void {
    this.adminAccountService.getAdminInfo().subscribe({
      next: (data) => {
        this.adminInfo = data;
      },
      error: (err) => {},
    });
  }

  getFullNameAdmin(): string {
    return `${this.adminInfo.first_name} ${this.adminInfo.last_name}`;
  }

  logout(): void {
    this.adminAccountService.logout().subscribe({
      next: (data) => {},
      error: (err) => {},
    });
    this.authService.logout();
  }
}
