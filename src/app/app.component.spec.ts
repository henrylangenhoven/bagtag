import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MockProvider } from 'ng-mocks';
import { of, throwError } from 'rxjs';
import { TagService } from './util/tags/tag.service';
import { Tag } from './util/tags/tag.model';

describe('AppComponent', () => {
  let tagService: TagService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [MockProvider(TagService)],
    }).compileComponents();

    tagService = TestBed.inject(TagService);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should fetch items from FirestoreService on creation', () => {
    const items: Tag[] = [{ id: '1', name: 'Item 1' } as Tag, { id: '2', name: 'Item 2' } as Tag];
    spyOn(tagService, 'getTags').and.returnValue(of(items));

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app.tags$).toBeDefined();
    expect(tagService.getTags).toHaveBeenCalled();
  });

  it('should handle empty items list from FirestoreService', () => {
    spyOn(tagService, 'getTags').and.returnValue(of([]));

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app.tags$).toBeDefined();
    expect(tagService.getTags).toHaveBeenCalled();
  });

  it('should handle FirestoreService failure', done => {
    spyOn(tagService, 'getTags').and.returnValue(throwError(() => new Error('Error fetching items')));

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.tags$.subscribe({
      next: () => done.fail('Expected error, but got a value.'),
      error: err => {
        expect(err.message).toEqual('Error fetching items');
        done();
      },
    });

    expect(tagService.getTags).toHaveBeenCalled();
  });
});
