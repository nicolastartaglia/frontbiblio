import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupprimerobjetPage } from './supprimerobjet.page';

const routes: Routes = [
  {
    path: '',
    component: SupprimerobjetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupprimerobjetPageRoutingModule {}
