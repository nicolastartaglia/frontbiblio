import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RechercheobjetPageRoutingModule } from './rechercheobjet-routing.module';

import { RechercheobjetPage } from './rechercheobjet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RechercheobjetPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RechercheobjetPage]
})
export class RechercheobjetPageModule {}
