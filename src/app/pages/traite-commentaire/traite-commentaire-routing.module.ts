import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TraiteCommentairePage } from './traite-commentaire.page';

const routes: Routes = [
  {
    path: '',
    component: TraiteCommentairePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TraiteCommentairePageRoutingModule {}
