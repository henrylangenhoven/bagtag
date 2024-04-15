import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.currentUser$ = this.afAuth.authState;
  }

  signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  signOut() {
    return this.afAuth.signOut();
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  redirectToHome() {
    this.router.navigate(['/']);
  }
}
