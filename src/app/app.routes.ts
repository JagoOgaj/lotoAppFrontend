import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginRegisterPageComponent } from './pages/login-register-page/login-register-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { DrawComponent } from './pages/draw/draw.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AdminLoginComponent } from './pages/admin/admin-login/admin-login.component';
import { authGuard } from './guards/auth.guard';
import { TokenExpirationComponent } from './pages/token-expiration/token-expiration.component';
import { TokenExpirationGuard } from './guards/tokenGuard/token-expiration.guard';
import { RedirectUserAuthGuard } from './guards/redirect/user-redirect.guard';
import { RedirectAdminAuthGuard } from './guards/redirect/admin-redirect.guards';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  {
    path: 'login',
    component: LoginRegisterPageComponent,
    canActivate: [RedirectUserAuthGuard],
  },
  { path: 'account', component: UserPageComponent }, //Metre un Auth-Guard pour protéger la route
  { path: 'draw/:id', component: DrawComponent }, // Mettre un auth-Guard et rajouter le parametre /:id
  {
    path: 'token-expired',
    component: TokenExpirationComponent,
    canActivate: [TokenExpirationGuard],
  },
  { path: 'contact', component: ContactComponent },
  {
    path: 'login-admin',
    component: AdminLoginComponent,
    canActivate: [RedirectAdminAuthGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import(
        '/Users/samyoki/Desktop/lotoProject/lotoAppfrontend/src/app/pages/admin/admin.routes'
      ).then((m) => m.adminRoutes),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'home' },
];
