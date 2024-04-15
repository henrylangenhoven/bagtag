import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDoc } from '@angular/fire/firestore';
import { BagTagCollectionsEnum } from './bagTag.collections.enum';
import { DocumentReference } from '@firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private firestore: Firestore = inject(Firestore);

  constructor() {}

  save(
    firestoreCollection: BagTagCollectionsEnum = BagTagCollectionsEnum.TAGS,
    payload: any
  ): Promise<DocumentReference<any>> {
    const collectionReference = collection(this.firestore, firestoreCollection); //TAGS_COLLECTION);

    return addDoc(collectionReference, payload);
  }

  getCollectionData(bagTagCollection: BagTagCollectionsEnum) {
    let collectionReference = collection(this.firestore, bagTagCollection);
    return collectionData(collectionReference, { idField: 'id' });
  }

  async getDocument(afCollection: BagTagCollectionsEnum, id: string) {
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

  delete(afCollection: BagTagCollectionsEnum, id: string) {
    let documentReference = doc(this.firestore, `/${afCollection}/`, id);
    return deleteDoc(documentReference);
  }

  private getCollection(bagTagCollection: BagTagCollectionsEnum) {
    return collection(this.firestore, bagTagCollection);
  }
}
