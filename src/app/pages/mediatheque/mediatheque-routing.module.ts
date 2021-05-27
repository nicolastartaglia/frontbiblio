import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MediathequePage } from './mediatheque.page';

const routes: Routes = [
  {
    path: '',
    component: MediathequePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MediathequePageRoutingModule {}
