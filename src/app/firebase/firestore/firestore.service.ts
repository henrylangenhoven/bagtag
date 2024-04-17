import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  onSnapshot,
  query,
  where,
} from '@angular/fire/firestore';
import { BagTagCollections } from './bagTagCollections';
import { DocumentReference } from '@firebase/firestore';
import { AuthService } from '@app/firebase/auth/auth.service';
import { Observable } from 'rxjs';
import { BagTagFirestoreDocument } from '@app/firebase/firestore/bagTagFirestoreDocument';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) {}

  save(firestoreCollection: BagTagCollections = BagTagCollections.TAGS, payload: any): Promise<DocumentReference<any>> {
    const collectionReference = collection(this.firestore, firestoreCollection); //TAGS_COLLECTION);
    payload.ownerId = this.authService.currentUserId;
    return addDoc(collectionReference, payload);
  }

  getCollectionData(bagTagCollection: BagTagCollections) {
    let collectionReference = collection(this.firestore, bagTagCollection);
    return collectionData(collectionReference, { idField: 'id' });
  }

  getCollectionDataForCurrentUser(bagTagCollection: BagTagCollections): Observable<BagTagFirestoreDocument[]> {
    const collectionReference = collection(this.firestore, bagTagCollection);
    const q = query(collectionReference, where('ownerId', '==', this.authService.currentUserId));

    return new Observable(observer => {
      return onSnapshot(q, snapshot => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        observer.next(data); // Emit the data
      });
    });
  }

  async getDocument(afCollection: BagTagCollections, id: string) {
    // TODO: test and implement
    let documentReference = doc(this.firestore, `/${afCollection}/`, id);
    let documentSnapshot = await getDoc(documentReference);

    if (documentSnapshot.exists()) {
      let data = documentSnapshot.data();
      console.log(data);
    } else {
      console.log('No such document!');
    }
  }

  delete(afCollection: BagTagCollections, id: string) {
    let documentReference = doc(this.firestore, `/${afCollection}/`, id);
    return deleteDoc(documentReference);
  }

  private getCollection(bagTagCollection: BagTagCollections) {
    return collection(this.firestore, bagTagCollection);
  }
}
