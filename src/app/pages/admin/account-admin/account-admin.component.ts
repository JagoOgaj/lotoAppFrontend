import { Component } from '@angular/core';
import { AdminInfoComponent } from "../../../shared/admin/admin-info/admin-info.component";
import { AdminPwdComponent } from "../../../shared/admin/admin-pwd/admin-pwd.component";

@Component({
  selector: 'app-account-admin',
  standalone: true,
  imports: [AdminInfoComponent, AdminPwdComponent],
  templateUrl: './account-admin.component.html',
  styleUrl: './account-admin.component.css'
})
export class AccountAdminComponent {
  adminName: string = 'hello';
}
