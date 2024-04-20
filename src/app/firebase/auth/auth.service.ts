import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import firebase from 'firebase/compat';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser$: Observable<firebase.User | null>;
  currentUserId$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.currentUser$ = this.afAuth.authState;

    this.currentUser$.pipe(takeUntilDestroyed()).subscribe(user => {
      this.currentUserId$.next(user?.uid);
    });
  }

  signIn(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signUp(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  signOut(): Promise<void> {
    this.currentUserId$.next(undefined);
    return this.afAuth.signOut();
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  redirectToHome() {
    this.router.navigate(['/']);
  }
}
