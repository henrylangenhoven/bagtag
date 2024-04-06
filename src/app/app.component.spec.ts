import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {MockProvider} from "ng-mocks";
import {FirestoreService} from "./firebase/firestore.service";
import {of, throwError} from "rxjs";

describe('AppComponent', () => {
  let firestoreService: FirestoreService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [MockProvider(FirestoreService)]
    }).compileComponents();


    firestoreService = TestBed.inject(FirestoreService);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should fetch items from FirestoreService on creation', () => {
    const items = [{id: 1, name: 'Item 1'}, {id: 2, name: 'Item 2'}];
    spyOn(firestoreService, 'getItems').and.returnValue(of(items));

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app.items$).toBeDefined()
    expect(firestoreService.getItems).toHaveBeenCalled();
  });

  it('should handle empty items list from FirestoreService', () => {
    spyOn(firestoreService, 'getItems').and.returnValue(of([]));

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app.items$).toBeDefined()
    expect(firestoreService.getItems).toHaveBeenCalled();
  });

  it('should handle FirestoreService failure', (done) => {
    spyOn(firestoreService, 'getItems').and.returnValue(throwError(() => new Error('Error fetching items')));

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.items$.subscribe({
      next: () => done.fail('Expected error, but got a value.'),
      error: err => {
        expect(err.message).toEqual('Error fetching items');
        done();
      }
    });

    expect(firestoreService.getItems).toHaveBeenCalled();
  });
});
