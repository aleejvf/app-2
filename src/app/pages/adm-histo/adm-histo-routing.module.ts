import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmHistoPage } from './adm-histo.page';

const routes: Routes = [
  {
    path: '',
    component: AdmHistoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmHistoPageRoutingModule {}
