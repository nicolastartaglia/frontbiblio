import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifierobjetPageRoutingModule } from './modifierobjet-routing.module';

import { ModifierobjetPage } from './modifierobjet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifierobjetPageRoutingModule
  ],
  declarations: [ModifierobjetPage]
})
export class ModifierobjetPageModule {}
