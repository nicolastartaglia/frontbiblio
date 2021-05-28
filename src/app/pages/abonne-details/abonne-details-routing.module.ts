import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AbonneDetailsPage } from './abonne-details.page';

const routes: Routes = [
  {
    path: '',
    component: AbonneDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AbonneDetailsPageRoutingModule {}
