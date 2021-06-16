import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjouterabonnePageRoutingModule } from './ajouterabonne-routing.module';

import { AjouterabonnePage } from './ajouterabonne.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjouterabonnePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AjouterabonnePage]
})
export class AjouterabonnePageModule {}
