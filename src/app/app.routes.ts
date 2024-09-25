import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginRegisterPageComponent } from './pages/login-register-page/login-register-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { DrawComponent } from './pages/draw/draw.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginRegisterPageComponent },
  { path: 'account', component: UserPageComponent }, //Metre un Auth-Guard pour protéger la route
  { path: 'draw', component: DrawComponent }, // Mettre un auth-Guard et rajouter le parametre /:id
  { path: 'contact', component: ContactComponent },
  {
    path: 'admin',
    loadChildren: () =>
      import(
        '/Users/samyoki/Desktop/lotoProject/lotoAppfrontend/src/app/pages/admin/admin.routes'
      ).then((m) => m.adminRoutes),
  },
  { path: '**', redirectTo: 'home' },
];
