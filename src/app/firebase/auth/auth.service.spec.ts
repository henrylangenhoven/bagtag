import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subject } from 'rxjs';

describe('AuthorizationService', () => {
  let service: AuthService;
  let afAuth: AngularFireAuth;

  let authState$: Subject<{ uid?: string } | null>;

  beforeEach(() => {
    authState$ = new Subject<{ uid?: string } | null>();
    const afAuthMock = {
      get authState() {
        return authState$.asObservable();
      },
      signInWithEmailAndPassword: jasmine.createSpy('signInWithEmailAndPassword'),
      createUserWithEmailAndPassword: jasmine.createSpy('createUserWithEmailAndPassword'),
      signOut: jasmine.createSpy('signOut'),
    };

    TestBed.configureTestingModule({
      providers: [AuthService, { provide: AngularFireAuth, useValue: afAuthMock }],
    });

    service = TestBed.inject(AuthService);
    afAuth = TestBed.inject(AngularFireAuth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return null for currentUser$ when user is not authenticated', () => {
    service.currentUser$.subscribe(user => {
      expect(user).toBeNull();
    });
  });

  it('should return user for currentUser$ when user is authenticated', () => {
    authState$.next({ uid: '123' });
    service.currentUser$.subscribe(user => {
      expect(user).toEqual({ uid: '123' });
    });
  });

  it('should call signInWithEmailAndPassword on signIn', () => {
    service.signIn('test@example.com', 'password');
    expect(afAuth.signInWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', 'password');
  });

  it('should call createUserWithEmailAndPassword on signUp', () => {
    service.signUp('test@example.com', 'password');
    expect(afAuth.createUserWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', 'password');
  });

  it('should call signOut on signOut', () => {
    service.signOut();
    expect(afAuth.signOut).toHaveBeenCalled();
  });
});
