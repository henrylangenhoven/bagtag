import { Injectable } from '@angular/core';
import { UserProfile } from '@models/user-profile';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private user: UserProfile = { name: 'John Doe', email: 'john.doe@example.com', password: 'password123' };

  getUser(): UserProfile {
    return this.user;
  }

  updateUser(userData: UserProfile): void {
    this.user = userData;
  }
}
