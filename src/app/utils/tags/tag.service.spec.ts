import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TagService } from './tag.service';
import { FirestoreService } from '@app/firebase/firestore/firestore.service';
import { DocumentReference } from '@firebase/firestore';
import { BagTagFirestoreDocument } from '@app/firebase/firestore/bagTagFirestoreDocument';
import { Tag } from '@utils/tags/tag.model';

describe('TagService', () => {
  let service: TagService;
  let firestoreServiceSpy: jasmine.SpyObj<FirestoreService>;

  beforeEach(() => {
    firestoreServiceSpy = jasmine.createSpyObj('FirestoreService', [
      'getCollectionSnapshotData',
      'getCollectionDataForCurrentUser',
      'save',
      'delete',
    ]);

    // Mock getCollectionDataForCurrentUser to return an Observable
    firestoreServiceSpy.getCollectionDataForCurrentUser.and.returnValue(of([]));

    TestBed.configureTestingModule({
      providers: [TagService, { provide: FirestoreService, useValue: firestoreServiceSpy }],
    });

    service = TestBed.inject(TagService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  xit('should fetch tags on creation', done => {
    // Add done callback
    const tagData: BagTagFirestoreDocument[] = [{ id: 'tag1', ownerId: 'owner1' }];
    firestoreServiceSpy.getCollectionDataForCurrentUser.and.returnValue(of(tagData));

    service.getTags().subscribe(tags => {
      expect(tags).toEqual(tagData as Tag[]);
      expect(firestoreServiceSpy.getCollectionDataForCurrentUser.calls.count()).toBe(1, 'one call');
      done(); // Call done when the asynchronous operation has completed
    });
  });

  it('should add a tag', () => {
    const newTag = { name: 'New Tag', url: 'New Tag' };
    const docRef: DocumentReference = {} as DocumentReference; // Create a mock DocumentReference
    firestoreServiceSpy.save.and.returnValue(Promise.resolve(docRef)); // Return a Promise that resolves to a DocumentReference

    service.addTag().then(() => {
      expect(firestoreServiceSpy.save.calls.count()).toBe(1, 'one call');
      expect(firestoreServiceSpy.save.calls.first().args[1]).toEqual(newTag);
    });
  });

  it('should delete a tag', () => {
    const tagId = 'tagId';
    firestoreServiceSpy.delete.and.returnValue(Promise.resolve());

    service.deleteTag(tagId).then(() => {
      expect(firestoreServiceSpy.delete.calls.count()).toBe(1, 'one call');
      expect(firestoreServiceSpy.delete.calls.first().args[1]).toBe(tagId);
    });
  });
});
