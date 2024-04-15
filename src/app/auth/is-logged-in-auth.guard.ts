import { CanActivateFn } from '@angular/router';
import { AuthService } from '@app/firebase/auth/auth.service';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';

export const isLoggedInAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  return authService.currentUser$.pipe(
    take(1),
    map(user => {
      if (user) {
        return true;
      }

      authService.redirectToLogin();
      return false;
    })
  );
};
