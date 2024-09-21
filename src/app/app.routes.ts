import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginRegisterPageComponent } from './pages/login-register-page/login-register-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginRegisterPageComponent },
  { path: 'account', component: UserPageComponent }, //Metre un Auth-Guard pour protéger la route
  { path: '**', redirectTo: 'home' },
];
