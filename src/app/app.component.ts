import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { AsyncPipe, NgForOf } from '@angular/common';
import { FirestoreService } from './firebase/firestore.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  firestoreService: FirestoreService = inject(FirestoreService);
  items$: Observable<any[]>;

  constructor() {
    this.items$ = this.firestoreService.getItems();
  }
}
