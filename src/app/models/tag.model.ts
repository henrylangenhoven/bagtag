import { BagTagFirestoreDocument } from '../firebase/firestore/bagTagFirestoreDocument';

export interface Tag extends BagTagFirestoreDocument {
  name?: string;
  uuid?: string;
  url: string;
}
