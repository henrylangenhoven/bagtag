import { BagTagFirestoreDocument } from './bagTagFirestoreDocument';

export interface Tag extends BagTagFirestoreDocument {
  name?: string;
  uuid?: string;
  url: string;
}
