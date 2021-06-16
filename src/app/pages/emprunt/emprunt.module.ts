import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpruntPageRoutingModule } from './emprunt-routing.module';

import { EmpruntPage } from './emprunt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpruntPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EmpruntPage]
})
export class EmpruntPageModule {}
