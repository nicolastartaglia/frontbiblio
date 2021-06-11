import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RechercherDetailsPage } from './rechercher-details.page';

const routes: Routes = [
  {
    path: '',
    component: RechercherDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RechercherDetailsPageRoutingModule {}
