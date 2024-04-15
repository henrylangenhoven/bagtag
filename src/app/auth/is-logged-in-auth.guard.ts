import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from '@app/firebase/auth/auth.service';

export const isLoggedInAuthGuard =
  (authService: AuthService, router: Router) =>
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> => {
    return authService.currentUser$.pipe(
      take(1),
      map(user => (!!user ? true : router.parseUrl('/login')))
    );
  };
