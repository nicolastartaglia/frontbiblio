import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MediathequePageRoutingModule } from './mediatheque-routing.module';

import { MediathequePage } from './mediatheque.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MediathequePageRoutingModule
  ],
  declarations: [MediathequePage]
})
export class MediathequePageModule {}
