import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileViewComponent } from './user-profile-view.component';
import { MockProvider } from 'ng-mocks';
import { ActivatedRoute } from '@angular/router';

describe('UserProfileViewComponent', () => {
  let component: UserProfileViewComponent;
  let fixture: ComponentFixture<UserProfileViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileViewComponent],
      providers: [
        MockProvider(ActivatedRoute, {
          snapshot: {
            paramMap: {
              get: () => 'mock-id', // mock value
            },
          },
        } as unknown as ActivatedRoute),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
