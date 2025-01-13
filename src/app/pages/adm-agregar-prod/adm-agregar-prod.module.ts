import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmAgregarProdPageRoutingModule } from './adm-agregar-prod-routing.module';

import { AdmAgregarProdPage } from './adm-agregar-prod.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmAgregarProdPageRoutingModule
  ],
  declarations: [AdmAgregarProdPage]
})
export class AdmAgregarProdPageModule {}
