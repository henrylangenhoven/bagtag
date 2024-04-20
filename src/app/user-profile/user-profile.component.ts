import { Component } from '@angular/core';
import { UserProfile } from '@models/user-profile';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  user: UserProfile = {};

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.userService.updateUser(form.value);
      alert('Profile updated successfully!');
    }
  }
}
