import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifierabonnePageRoutingModule } from './modifierabonne-routing.module';

import { ModifierabonnePage } from './modifierabonne.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifierabonnePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModifierabonnePage]
})
export class ModifierabonnePageModule {}
