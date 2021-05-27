import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReferentDetailsPageRoutingModule } from './referent-details-routing.module';

import { ReferentDetailsPage } from './referent-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReferentDetailsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ReferentDetailsPage]
})
export class ReferentDetailsPageModule {}
