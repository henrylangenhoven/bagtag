import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { AsyncPipe, NgForOf } from '@angular/common';
import { QrCodeComponent } from '@app/utils/qr-code/qr-code/qr-code.component';
import { TagService } from '@app/utils/tags/tag.service';
import { Tag } from '@app/utils/tags/tag.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, AsyncPipe, QrCodeComponent, FormsModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private tagService: TagService = inject(TagService);

  tags$: Observable<Tag[]>;
  tagName: string = 'New Tag';

  constructor() {
    this.tags$ = this.tagService.getTags();
  }

  addTag(name: string = this.tagName) {
    this.tagService.addTag(name);
  }

  deleteTag(id: string | undefined) {
    if (id) {
      this.tagService.deleteTag(id);
    }
  }
}
