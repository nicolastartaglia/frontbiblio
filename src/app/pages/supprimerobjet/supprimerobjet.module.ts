import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupprimerobjetPageRoutingModule } from './supprimerobjet-routing.module';

import { SupprimerobjetPage } from './supprimerobjet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupprimerobjetPageRoutingModule
  ],
  declarations: [SupprimerobjetPage]
})
export class SupprimerobjetPageModule {}
