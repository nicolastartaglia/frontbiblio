import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjouterobjetPageRoutingModule } from './ajouterobjet-routing.module';

import { AjouterobjetPage } from './ajouterobjet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjouterobjetPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AjouterobjetPage]
})
export class AjouterobjetPageModule {}
