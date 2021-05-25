import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BibliothecairePage } from './bibliothecaire.page';

const routes: Routes = [
  {
    path: '',
    component: BibliothecairePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BibliothecairePageRoutingModule {}
