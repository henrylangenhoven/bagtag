import { Component, inject } from '@angular/core';
import { AuthService } from '@app/firebase/auth/auth.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss',
})
export class LogoutComponent {
  private authService = inject(AuthService);

  logOut() {
    this.authService
      .signOut()
      .then(() => this.authService.redirectToLogin())
      .catch((e: any) => console.error(e));
  }
}
