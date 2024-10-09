import { Routes } from '@angular/router';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { ManageParticipantsComponent } from './manage-participants/manage-participants.component';
import { TirageDetailsComponent } from './tirage-details/tirage-details.component';
import { TirageListComponent } from './tirage-list/tirage-list.component';
import { AccountAdminComponent } from './account-admin/account-admin.component';
import { TirageResultComponent } from './tirage-result/tirage-result.component';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminMainComponent,
    children: [
      {
        path: 'manage-participants/tirage/:id',
        component: ManageParticipantsComponent,
      },
      { path: 'tirage-list', component: TirageListComponent },
      { path: 'tirage-details/:id', component: TirageDetailsComponent },
      { path: 'tirage-result/:id', component: TirageResultComponent },
      { path: 'account', component: AccountAdminComponent },
      { path: '**', redirectTo: 'tirage-list' },
    ],
  },
];
