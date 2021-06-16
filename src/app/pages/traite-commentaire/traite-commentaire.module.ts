import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TraiteCommentairePageRoutingModule } from './traite-commentaire-routing.module';

import { TraiteCommentairePage } from './traite-commentaire.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TraiteCommentairePageRoutingModule
  ],
  declarations: [TraiteCommentairePage]
})
export class TraiteCommentairePageModule {}
