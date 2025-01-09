import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmProducPage } from './adm-produc.page';

const routes: Routes = [
  {
    path: '',
    component: AdmProducPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmProducPageRoutingModule {}
