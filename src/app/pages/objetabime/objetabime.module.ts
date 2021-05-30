import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ObjetabimePageRoutingModule } from './objetabime-routing.module';

import { ObjetabimePage } from './objetabime.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ObjetabimePageRoutingModule
  ],
  declarations: [ObjetabimePage]
})
export class ObjetabimePageModule {}
