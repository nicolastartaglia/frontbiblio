import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RechercheabonnePageRoutingModule } from './rechercheabonne-routing.module';

import { RechercheabonnePage } from './rechercheabonne.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RechercheabonnePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RechercheabonnePage]
})
export class RechercheabonnePageModule {}
