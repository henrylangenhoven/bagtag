import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Tag } from './tag.model';
import { FirestoreService } from '../../firebase/firestore.service';

const TAGS_PATH = '/tag/';
const TAGS_COLLECTION = 'tags';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  firestoreService: FirestoreService = inject(FirestoreService);
  private firestore: Firestore = inject(Firestore);
  private tagsCollection = collection(this.firestore, 'items'); //TAGS_COLLECTION);

  tags$: Observable<Tag[]>;

  constructor() {
    this.tags$ = collectionData(this.tagsCollection) as Observable<Tag[]>;
  }

  addTag(name: string = 'New Tag') {
    const tagsCollection = collection(this.firestore, 'items'); //TAGS_COLLECTION);
    const newTag: Tag = {
      name: name,
      url: window.location.origin + TAGS_PATH + Math.floor(Math.random() * 100),
    };

    return addDoc(tagsCollection, newTag);
  }

  getTags() {
    return collectionData(this.tagsCollection) as Observable<Tag[]>;
  }

  deleteTag() {
    return;
  }
}
