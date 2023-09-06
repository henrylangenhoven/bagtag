import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TagComponent } from './tag/tag.component';

const routes: Routes = [
  {
    path: 'tag/:id',
    component: TagComponent,
    loadChildren: () => import('./tag/tag.module').then(m => m.TagModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
