import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoutComponent } from './logout.component';
import { AuthService } from '@app/firebase/auth/auth.service';
import { NgIf } from '@angular/common';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['signOut', 'redirectToLogin']);

    await TestBed.configureTestingModule({
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
      imports: [LogoutComponent, NgIf], // RouterTestingModule is necessary for routing functions
    }).compileComponents();

    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to login on successful logout', async () => {
    authServiceSpy.signOut.and.resolveTo(); // Simulate a successful logout
    await component.logOut();
    expect(authServiceSpy.redirectToLogin).toHaveBeenCalled();
  });
});
