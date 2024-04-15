import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@app/firebase/auth/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  login() {
    if (this.loginForm.valid) {
      this.authService
        .signIn(this.loginForm.value.email!!, this.loginForm.value.password!!)
        .then((result: any) => {
          console.log(result);
        })
        .catch((error: any) => {
          console.error(error);
        });
    }
  }
}
