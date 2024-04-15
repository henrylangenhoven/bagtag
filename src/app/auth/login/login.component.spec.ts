import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@app/firebase/auth/auth.service';
import { LoginComponent } from '@app/auth/login/login.component';
import { MockProvider } from 'ng-mocks';
import { ActivatedRoute } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: any;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['signIn']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        MockProvider(ActivatedRoute, {
          snapshot: {
            paramMap: {
              get: () => 'mock-id', // mock value
            },
          },
        } as unknown as ActivatedRoute),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call signIn when form is valid', () => {
    authServiceMock.signIn.and.returnValue(Promise.resolve({}));

    component.loginForm.setValue({ email: 'test@test.com', password: 'password' });
    component.login();

    expect(authServiceMock.signIn).toHaveBeenCalledWith('test@test.com', 'password');
  });

  it('should not call signIn when form is invalid', () => {
    authServiceMock.signIn.and.returnValue(Promise.resolve({}));

    component.loginForm.setValue({ email: 'test', password: 'pass' });
    component.login();

    expect(authServiceMock.signIn).not.toHaveBeenCalled();
  });

  it('should handle signIn error', () => {
    authServiceMock.signIn.and.returnValue(Promise.reject('error'));

    component.loginForm.setValue({ email: 'test@test.com', password: 'password' });
    component.login();

    expect(authServiceMock.signIn).toHaveBeenCalledWith('test@test.com', 'password');
  });
});
