import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, of, take } from 'rxjs';
import { AuthService } from '@app/firebase/auth/auth.service';

export const isLoggedInAuthGuard =
  (authService: AuthService, router: Router) =>
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> => {
    return authService.currentUser$.pipe(
      take(1),
      map(user => (!!user ? true : router.parseUrl('/login'))),
      map(result => (result === false ? of(false) : result)) // ensure that the function always returns an Observable
    );
  };
