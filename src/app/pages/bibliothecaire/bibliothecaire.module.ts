import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BibliothecairePageRoutingModule } from './bibliothecaire-routing.module';

import { BibliothecairePage } from './bibliothecaire.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BibliothecairePageRoutingModule
  ],
  declarations: [BibliothecairePage]
})
export class BibliothecairePageModule {}
