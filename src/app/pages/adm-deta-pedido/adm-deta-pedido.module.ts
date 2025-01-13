import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmDetaPedidoPageRoutingModule } from './adm-deta-pedido-routing.module';

import { AdmDetaPedidoPage } from './adm-deta-pedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmDetaPedidoPageRoutingModule
  ],
  declarations: [AdmDetaPedidoPage]
})
export class AdmDetaPedidoPageModule {}
