import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isLoggedInAuthGuard } from './is-logged-in-auth.guard';

describe('isLoggedInAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => isLoggedInAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
// TODO
