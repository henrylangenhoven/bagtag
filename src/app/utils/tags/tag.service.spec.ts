import { TestBed } from '@angular/core/testing';
import { TagService } from './tag.service';
import { FirestoreService } from '@app/firebase/firestore/firestore.service';
import { AuthService } from '@app/firebase/auth/auth.service';
import { BehaviorSubject, of } from 'rxjs';
import { BagTagCollections } from '@app/firebase/firestore/bagTagCollections';

describe('TagService', () => {
  let service: TagService;
  let firestoreServiceMock: any;
  let authServiceMock: any;

  beforeEach(() => {
    firestoreServiceMock = {
      getCollectionDataForUser: jasmine.createSpy().and.returnValue(of([])),
      save: jasmine.createSpy(),
      delete: jasmine.createSpy().and.returnValue(of({})),
    };

    authServiceMock = {
      currentUserId$: new BehaviorSubject<string | undefined>(undefined),
    };

    TestBed.configureTestingModule({
      providers: [
        TagService,
        { provide: FirestoreService, useValue: firestoreServiceMock },
        { provide: AuthService, useValue: authServiceMock },
      ],
    });

    service = TestBed.inject(TagService);
  });

  describe('Handling User Authentication', () => {
    it('should reset tags when user logs out (userId becomes undefined)', () => {
      authServiceMock.currentUserId$.next(undefined);
      expect(firestoreServiceMock.getCollectionDataForUser).not.toHaveBeenCalled();
      service.getTagsForCurrentUser().subscribe(tags => {
        expect(tags).toEqual([]);
      });
    });

    it('should load tags when user logs in', () => {
      const mockTags = [{ name: 'Tag1', url: 'url1', ownerId: 'user1' }];
      firestoreServiceMock.getCollectionDataForUser.and.returnValue(of(mockTags));
      authServiceMock.currentUserId$.next('user1');
      service.getTagsForCurrentUser().subscribe(tags => {
        expect(tags).toEqual(mockTags);
      });
      expect(firestoreServiceMock.getCollectionDataForUser).toHaveBeenCalledWith(BagTagCollections.TAGS, 'user1');
    });
  });

  describe('Test addTagForCurrentUser, getTagsForCurrentUser, and deleteTag Methods', () => {
    it('should add a new tag', () => {
      const newTag = { name: 'New Tag', url: 'New Tag', ownerId: 'user1' };
      authServiceMock.currentUserId$.next('user1');
      service.addTagForCurrentUser('New Tag');
      expect(firestoreServiceMock.save).toHaveBeenCalledWith(BagTagCollections.TAGS, newTag);
    });

    it('should return the observable of tags', () => {
      service.getTagsForCurrentUser().subscribe(tags => {
        expect(tags).toBeInstanceOf(Array);
      });
    });

    it('should delete a tag', () => {
      service.deleteTag('tagId1');
      expect(firestoreServiceMock.delete).toHaveBeenCalledWith(BagTagCollections.TAGS, 'tagId1');
    });
  });
});
