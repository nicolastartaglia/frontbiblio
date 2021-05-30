import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RechercheobjetPageRoutingModule } from './rechercheobjet-routing.module';

import { RechercheobjetPage } from './rechercheobjet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RechercheobjetPageRoutingModule
  ],
  declarations: [RechercheobjetPage]
})
export class RechercheobjetPageModule {}
