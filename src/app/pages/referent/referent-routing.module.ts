import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReferentPage } from './referent.page';

const routes: Routes = [
  {
    path: '',
    component: ReferentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReferentPageRoutingModule {}
