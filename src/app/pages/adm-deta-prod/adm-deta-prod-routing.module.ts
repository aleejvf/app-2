import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmDetaProdPage } from './adm-deta-prod.page';

const routes: Routes = [
  {
    path: '',
    component: AdmDetaProdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmDetaProdPageRoutingModule {}
