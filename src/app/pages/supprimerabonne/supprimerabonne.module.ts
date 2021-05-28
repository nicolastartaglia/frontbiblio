import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupprimerabonnePageRoutingModule } from './supprimerabonne-routing.module';

import { SupprimerabonnePage } from './supprimerabonne.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupprimerabonnePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SupprimerabonnePage]
})
export class SupprimerabonnePageModule {}
