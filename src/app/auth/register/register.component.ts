import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@app/firebase/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private authService = inject(AuthService);

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  register() {
    if (this.registerForm.valid) {
      this.authService
        .signUp(this.registerForm.value.email!!, this.registerForm.value.password!!)
        .then(() => {
          // Handle successful registration here
          console.log('Registration successful');
        })
        .catch(error => {
          // Handle registration error here
          console.error(error);
        });
    }
  }
}
