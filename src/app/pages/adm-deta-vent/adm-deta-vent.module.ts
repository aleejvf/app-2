import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmDetaVentPageRoutingModule } from './adm-deta-vent-routing.module';

import { AdmDetaVentPage } from './adm-deta-vent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmDetaVentPageRoutingModule
  ],
  declarations: [AdmDetaVentPage]
})
export class AdmDetaVentPageModule {}
