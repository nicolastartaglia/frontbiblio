import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ObjetDetailsPage } from './objet-details.page';

const routes: Routes = [
  {
    path: '',
    component: ObjetDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ObjetDetailsPageRoutingModule {}
