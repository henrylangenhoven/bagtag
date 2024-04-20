import { BaseFirestoreDocument } from '@models/base-firestore-document';

export interface UserProfile extends BaseFirestoreDocument {
  name?: string;
  email?: string;
}
