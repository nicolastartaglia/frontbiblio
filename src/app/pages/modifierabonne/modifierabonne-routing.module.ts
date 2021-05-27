import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifierabonnePage } from './modifierabonne.page';

const routes: Routes = [
  {
    path: '',
    component: ModifierabonnePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifierabonnePageRoutingModule {}
