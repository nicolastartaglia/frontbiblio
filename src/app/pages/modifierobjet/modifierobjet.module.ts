import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifierobjetPageRoutingModule } from './modifierobjet-routing.module';

import { ModifierobjetPage } from './modifierobjet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifierobjetPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModifierobjetPage]
})
export class ModifierobjetPageModule {}
