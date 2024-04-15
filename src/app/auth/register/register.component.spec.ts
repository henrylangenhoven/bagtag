import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@app/firebase/auth/auth.service';
import { RegisterComponent } from './register.component';
import { of } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceMock: any;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['signIn', 'signUp', 'signOut']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register when form is valid', () => {
    authServiceMock.signUp.and.returnValue(Promise.resolve({}));

    component.registerForm.setValue({ email: 'test@test.com', password: 'password' });
    component.register();

    expect(authServiceMock.signUp).toHaveBeenCalledWith('test@test.com', 'password');
  });

  it('should handle registration error', () => {
    authServiceMock.signUp.and.returnValue(Promise.reject('error'));

    component.registerForm.setValue({ email: 'test@test.com', password: 'password' });
    component.register();

    expect(authServiceMock.signUp).toHaveBeenCalledWith('test@test.com', 'password');
  });

  it('should not register when form is invalid', () => {
    authServiceMock.signUp.and.returnValue(of({}));

    component.registerForm.setValue({ email: 'test', password: 'pass' });
    component.register();

    expect(authServiceMock.signUp).not.toHaveBeenCalled();
  });
});
