import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private firestore: Firestore = inject(Firestore);
  private readonly items$: Observable<any[]>;

  private readonly items = 'items';

  constructor() {
    const aCollection = collection(this.firestore, this.items);
    this.items$ = collectionData(aCollection);
  }

  getItems(): Observable<any[]> {
    return this.items$;
  }

  //    TODO: make this generic and remove Firestore dependency from TagService
}
