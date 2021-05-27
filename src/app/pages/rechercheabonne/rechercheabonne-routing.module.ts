import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RechercheabonnePage } from './rechercheabonne.page';

const routes: Routes = [
  {
    path: '',
    component: RechercheabonnePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RechercheabonnePageRoutingModule {}
