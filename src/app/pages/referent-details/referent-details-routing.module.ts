import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReferentDetailsPage } from './referent-details.page';

const routes: Routes = [
  {
    path: '',
    component: ReferentDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReferentDetailsPageRoutingModule {}
