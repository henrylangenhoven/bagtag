import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgForOf } from '@angular/common';
import { QrCodeComponent } from '@utils/qr-code/qr-code/qr-code.component';
import { TagsComponent } from './tags.component';
import { TagService } from '@utils/tags/tag.service';
import { Observable, of } from 'rxjs';
import { Tag } from '@utils/tags/tag.model';
import { MockComponent } from 'ng-mocks';

describe('TagsComponent', () => {
  let component: TagsComponent;
  let fixture: ComponentFixture<TagsComponent>;
  let tagServiceMock: jasmine.SpyObj<TagService>;

  beforeEach(async () => {
    tagServiceMock = jasmine.createSpyObj('TagService', ['getTagsForCurrentUser', 'addTagForCurrentUser', 'deleteTag']);
    const mockTags$: Observable<Tag[]> = of([{ id: '1', name: 'Sample Tag', url: '', ownerId: 'user1' }]);

    tagServiceMock.getTagsForCurrentUser.and.returnValue(mockTags$);

    await TestBed.configureTestingModule({
      imports: [FormsModule, TagsComponent, MockComponent(QrCodeComponent)],
      declarations: [AsyncPipe, NgForOf],
      providers: [{ provide: TagService, useValue: tagServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(TagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Ensure component initialization logic is triggered
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with a list of tags from the TagService', () => {
    component.tags$.subscribe(tags => {
      expect(tags.length).toBe(1);
      expect(tags[0].name).toEqual('Sample Tag');
    });
    expect(tagServiceMock.getTagsForCurrentUser).toHaveBeenCalled();
  });

  describe('Add Tag', () => {
    it('should call addTagForCurrentUser with the default tag name', () => {
      component.addTag();
      expect(tagServiceMock.addTagForCurrentUser).toHaveBeenCalledWith('New Tag');
    });

    it('should call addTagForCurrentUser with a specified tag name', () => {
      component.addTag('Special Tag');
      expect(tagServiceMock.addTagForCurrentUser).toHaveBeenCalledWith('Special Tag');
    });
  });

  describe('Delete Tag', () => {
    it('should call deleteTag on the service when an ID is provided', () => {
      component.deleteTag('1');
      expect(tagServiceMock.deleteTag).toHaveBeenCalledWith('1');
    });

    it('should not call deleteTag on the service when no ID is provided', () => {
      component.deleteTag(undefined);
      expect(tagServiceMock.deleteTag).not.toHaveBeenCalled();
    });
  });
});
