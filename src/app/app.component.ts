import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { AsyncPipe, NgForOf } from '@angular/common';
import { FirestoreService } from './firebase/firestore.service';
import { QrCodeComponent } from './util/qr-code/qr-code/qr-code.component';
import { TagService } from './util/tags/tag.service';
import { Tag } from './util/tags/tag.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, AsyncPipe, QrCodeComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private tagService: TagService = inject(TagService);
  firestoreService: FirestoreService = inject(FirestoreService);

  items$: Observable<any[]>;
  tags$: Observable<Tag[]>;
  tagName: string = 'New Tag';

  constructor() {
    this.items$ = this.firestoreService.getItems();
    this.tags$ = this.tagService.getTags();
  }

  addTag(name: string = this.tagName) {
    this.tagService.addTag(name);
  }
}
