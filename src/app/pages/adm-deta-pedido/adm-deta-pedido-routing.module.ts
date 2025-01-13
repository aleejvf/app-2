import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmDetaPedidoPage } from './adm-deta-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: AdmDetaPedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmDetaPedidoPageRoutingModule {}
