import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmAgregarProdPage } from './adm-agregar-prod.page';

const routes: Routes = [
  {
    path: '',
    component: AdmAgregarProdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmAgregarProdPageRoutingModule {}
