import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmDetaVentPage } from './adm-deta-vent.page';

const routes: Routes = [
  {
    path: '',
    component: AdmDetaVentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmDetaVentPageRoutingModule {}
