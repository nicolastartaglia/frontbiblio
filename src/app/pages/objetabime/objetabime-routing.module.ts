import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ObjetabimePage } from './objetabime.page';

const routes: Routes = [
  {
    path: '',
    component: ObjetabimePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ObjetabimePageRoutingModule {}
