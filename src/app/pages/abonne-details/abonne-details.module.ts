import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AbonneDetailsPageRoutingModule } from './abonne-details-routing.module';

import { AbonneDetailsPage } from './abonne-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AbonneDetailsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AbonneDetailsPage]
})
export class AbonneDetailsPageModule {}
