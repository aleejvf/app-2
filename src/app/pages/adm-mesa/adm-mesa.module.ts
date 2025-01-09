import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmMesaPageRoutingModule } from './adm-mesa-routing.module';

import { AdmMesaPage } from './adm-mesa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmMesaPageRoutingModule
  ],
  declarations: [AdmMesaPage]
})
export class AdmMesaPageModule {}
