import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AbonnePageRoutingModule } from './abonne-routing.module';

import { AbonnePage } from './abonne.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AbonnePageRoutingModule
  ],
  declarations: [AbonnePage]
})
export class AbonnePageModule {}
