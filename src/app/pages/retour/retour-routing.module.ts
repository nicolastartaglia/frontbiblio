import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RetourPage } from './retour.page';

const routes: Routes = [
  {
    path: '',
    component: RetourPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RetourPageRoutingModule {}
