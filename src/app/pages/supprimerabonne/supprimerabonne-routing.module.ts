import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupprimerabonnePage } from './supprimerabonne.page';

const routes: Routes = [
  {
    path: '',
    component: SupprimerabonnePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupprimerabonnePageRoutingModule {}
