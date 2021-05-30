import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjouterobjetPage } from './ajouterobjet.page';

const routes: Routes = [
  {
    path: '',
    component: AjouterobjetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjouterobjetPageRoutingModule {}
