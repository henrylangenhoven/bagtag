import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LogoutComponent } from '@app/auth/logout/logout.component';
import { ProfileComponent } from '@app/profile/profile/profile.component';
import { isLoggedInAuthGuard } from '@app/auth/is-logged-in-auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [isLoggedInAuthGuard] },
];
