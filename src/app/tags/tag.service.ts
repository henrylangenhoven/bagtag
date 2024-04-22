import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, switchMap } from 'rxjs';
import { Tag } from '@models/tag';
import { FirestoreService } from '@app/firebase/firestore/firestore.service';
import { BagTagCollections } from '@app/firebase/firestore/bagTagCollections';
import { AuthService } from '@app/firebase/auth/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private tagsForCurrentUserSubject = new BehaviorSubject<Tag[]>([]);
  private tagsForCurrentUser$ = this.tagsForCurrentUserSubject.asObservable();

  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService
  ) {
    this.authService.currentUserId$
      .pipe(
        switchMap(userId => {
          if (!userId) {
            // If the user ID is undefined, reset the tags
            this.tagsForCurrentUserSubject.next([]);
            return EMPTY;
          } else {
            // If the user ID is defined, load the tags for the user
            return this.firestoreService.getCollectionDataForUser(BagTagCollections.TAGS, userId);
          }
        }),
        takeUntilDestroyed()
      )
      .subscribe(data => {
        this.tagsForCurrentUserSubject.next(data as Tag[]);
      });
  }

  addTagForCurrentUser(name: string = 'New Tag') {
    const newTag: Tag = {
      name: name,
      url: name,
      ownerId: this.authService.currentUserId$.value,
    };
    return this.firestoreService.save(BagTagCollections.TAGS, newTag);
  }

  getTagsForCurrentUser() {
    return this.tagsForCurrentUser$;
  }

  deleteTag(id: string) {
    return this.firestoreService.delete(BagTagCollections.TAGS, id);
  }
}
