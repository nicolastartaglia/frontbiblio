import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RechercherDetailsPageRoutingModule } from './rechercher-details-routing.module';

import { RechercherDetailsPage } from './rechercher-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RechercherDetailsPageRoutingModule
  ],
  declarations: [RechercherDetailsPage]
})
export class RechercherDetailsPageModule {}
