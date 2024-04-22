import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LogoutComponent } from '@app/auth/logout/logout.component';
import { isLoggedInAuthGuard } from '@app/auth/is-logged-in-auth.guard';
import { TagsComponent } from '@app/tags/tags.component';
import { UserProfileViewComponent } from '@app/user-profile/user-profile-view/user-profile-view.component';
import { UserProfileEditComponent } from '@app/user-profile/user-profile-edit/user-profile-edit.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tags', pathMatch: 'full' },
  { path: 'tags', component: TagsComponent, canActivate: [isLoggedInAuthGuard] },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [isLoggedInAuthGuard] },
  { path: 'profile', component: UserProfileViewComponent, canActivate: [isLoggedInAuthGuard] },
  { path: 'profile/edit', component: UserProfileEditComponent, canActivate: [isLoggedInAuthGuard] },
];
