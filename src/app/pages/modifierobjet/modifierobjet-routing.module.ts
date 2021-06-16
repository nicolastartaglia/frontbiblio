import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifierobjetPage } from './modifierobjet.page';

const routes: Routes = [
  {
    path: '',
    component: ModifierobjetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifierobjetPageRoutingModule {}
