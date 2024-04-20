import { CanActivateFn, UrlTree } from '@angular/router';
import { AuthService } from '@app/firebase/auth/auth.service';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';

export const isLoggedInAuthGuard: CanActivateFn = (route, state): Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  return authService.currentUser$.pipe(
    map(user => {
      if (user) {
        return true;
      }

      authService.redirectToLogin();
      return false;
    })
  );
};
