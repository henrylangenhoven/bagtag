import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LogoutComponent } from '@app/auth/logout/logout.component';
import { ProfileComponent } from '@app/profile/profile/profile.component';
import { isLoggedInAuthGuard } from '@app/auth/is-logged-in-auth.guard';
import { TagsComponent } from '@app/tags/tags.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tags', pathMatch: 'full' },
  { path: 'tags', component: TagsComponent, canActivate: [isLoggedInAuthGuard] },

  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [isLoggedInAuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [isLoggedInAuthGuard] },
  { path: 'register', component: RegisterComponent },
];
