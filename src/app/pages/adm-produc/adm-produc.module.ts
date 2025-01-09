import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmProducPageRoutingModule } from './adm-produc-routing.module';

import { AdmProducPage } from './adm-produc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmProducPageRoutingModule
  ],
  declarations: [AdmProducPage]
})
export class AdmProducPageModule {}
