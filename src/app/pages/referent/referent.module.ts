import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReferentPageRoutingModule } from './referent-routing.module';

import { ReferentPage } from './referent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReferentPageRoutingModule
  ],
  declarations: [ReferentPage]
})
export class ReferentPageModule {}
