import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '@app/firebase/auth/auth.service';
import { LogoutComponent } from '@app/auth/logout/logout.component';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;
  let authServiceMock: any;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['signOut']);

    await TestBed.configureTestingModule({
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call signOut when logOut is called', () => {
    authServiceMock.signOut.and.returnValue(Promise.resolve());

    component.logOut();

    expect(authServiceMock.signOut).toHaveBeenCalled();
  });

  it('should handle signOut error', () => {
    authServiceMock.signOut.and.returnValue(Promise.reject('error'));

    component.logOut();

    expect(authServiceMock.signOut).toHaveBeenCalled();
  });
});
