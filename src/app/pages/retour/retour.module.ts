import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RetourPageRoutingModule } from './retour-routing.module';

import { RetourPage } from './retour.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RetourPageRoutingModule
  ],
  declarations: [RetourPage]
})
export class RetourPageModule {}
