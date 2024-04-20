import { BaseFirestoreDocument } from './base-firestore-document';

export interface Tag extends BaseFirestoreDocument {
  name?: string;
  uuid?: string;
  url: string;
}
