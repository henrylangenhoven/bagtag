import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let afAuthMock: any;
  let routerMock: any;

  beforeEach(() => {
    afAuthMock = {
      authState: of(null), // start with no user logged in
      signInWithEmailAndPassword: jasmine.createSpy(),
      createUserWithEmailAndPassword: jasmine.createSpy(),
      signOut: jasmine.createSpy().and.returnValue(Promise.resolve()),
    };

    routerMock = {
      navigate: jasmine.createSpy(),
    };

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AngularFireAuth, useValue: afAuthMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('signIn', () => {
    it('should call signInWithEmailAndPassword with email and password', () => {
      const email = 'test@example.com';
      const password = '123456';
      service.signIn(email, password);
      expect(afAuthMock.signInWithEmailAndPassword).toHaveBeenCalledWith(email, password);
    });
  });

  describe('signUp', () => {
    it('should call createUserWithEmailAndPassword with email and password', () => {
      const email = 'test@example.com';
      const password = '123456';
      service.signUp(email, password);
      expect(afAuthMock.createUserWithEmailAndPassword).toHaveBeenCalledWith(email, password);
    });
  });

  describe('signOut', () => {
    it('should call signOut on afAuth and reset currentUserId$', done => {
      service.signOut().then(() => {
        expect(afAuthMock.signOut).toHaveBeenCalled();
        expect(service.currentUserId$.getValue()).toBeUndefined();
        done();
      });
    });
  });

  describe('authState subscription', () => {
    it('should update currentUserId$ when authState emits a new user', done => {
      const mockUser = { uid: '12345' };
      afAuthMock.authState = of(mockUser); // Set the new user before service instantiation

      // Re-instantiate AuthService to ensure it subscribes to the updated authState
      TestBed.resetTestingModule(); // Reset the testing module to clear previous instances
      TestBed.configureTestingModule({
        providers: [
          { provide: AngularFireAuth, useValue: afAuthMock },
          { provide: Router, useValue: routerMock },
          AuthService,
        ],
      });
      service = TestBed.inject(AuthService);

      // Ensure we are subscribing after the service is fully initialized
      setTimeout(() => {
        service.currentUserId$.subscribe(userId => {
          expect(userId).toEqual('12345');
          done();
        });
      }, 0);
    });
  });

  describe('Navigation', () => {
    it('should navigate to login on redirectToLogin', () => {
      service.redirectToLogin();
      expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should navigate to home on redirectToHome', () => {
      service.redirectToHome();
      expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
    });
  });
});
