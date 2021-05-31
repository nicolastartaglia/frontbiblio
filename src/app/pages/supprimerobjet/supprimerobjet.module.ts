import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupprimerobjetPageRoutingModule } from './supprimerobjet-routing.module';

import { SupprimerobjetPage } from './supprimerobjet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupprimerobjetPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SupprimerobjetPage]
})
export class SupprimerobjetPageModule {}
