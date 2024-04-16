import { Component, inject } from '@angular/core';
import { AsyncPipe, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QrCodeComponent } from '@utils/qr-code/qr-code/qr-code.component';
import { TagService } from '@utils/tags/tag.service';
import { Observable } from 'rxjs';
import { Tag } from '@utils/tags/tag.model';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [AsyncPipe, FormsModule, NgForOf, QrCodeComponent],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss',
})
export class TagsComponent {
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
