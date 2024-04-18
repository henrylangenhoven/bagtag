import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Tag } from './tag.model';
import { FirestoreService } from '@app/firebase/firestore/firestore.service';
import { BagTagCollections } from '@app/firebase/firestore/bagTagCollections';

@Injectable({
  providedIn: 'root',
})
export class TagService implements OnDestroy {
  private tagsSubject = new BehaviorSubject<Tag[]>([]);
  private tags$ = this.tagsSubject.asObservable();

  private subscriptions: Subscription[] = [];

  constructor(private firestoreService: FirestoreService) {
    this.subscriptions.push(
      this.firestoreService.getCollectionDataForCurrentUser(BagTagCollections.TAGS).subscribe(data => {
        this.tagsSubject.next(data as Tag[]);
      })
    );
  }

  addTag(name: string = 'New Tag') {
    const newTag: Tag = {
      name: name,
      url: name,
    };
    return this.firestoreService.save(BagTagCollections.TAGS, newTag);
  }

  getTags() {
    return this.tags$;
  }

  deleteTag(id: string) {
    return this.firestoreService.delete(BagTagCollections.TAGS, id);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
