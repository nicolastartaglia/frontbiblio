import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ObjetDetailsPageRoutingModule } from './objet-details-routing.module';

import { ObjetDetailsPage } from './objet-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ObjetDetailsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ObjetDetailsPage]
})
export class ObjetDetailsPageModule {}
