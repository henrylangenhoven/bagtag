import { BagTagFirestoreDocument } from './bag-tag-firestore-document.model';

export interface Tag extends BagTagFirestoreDocument {
  name?: string;
  uuid?: string;
  url: string;
}
