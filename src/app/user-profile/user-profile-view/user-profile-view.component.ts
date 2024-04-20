import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserProfile } from '@models/user-profile';
import { UserProfileService } from '@app/user-profile/user-profile.service';

@Component({
  selector: 'app-user-profile-view',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-profile-view.component.html',
  styleUrl: './user-profile-view.component.scss',
})
export class UserProfileViewComponent {
  user: UserProfile = {};

  constructor(private userService: UserProfileService) {}

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
