import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ObjetperduPageRoutingModule } from './objetperdu-routing.module';

import { ObjetperduPage } from './objetperdu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ObjetperduPageRoutingModule
  ],
  declarations: [ObjetperduPage]
})
export class ObjetperduPageModule {}
