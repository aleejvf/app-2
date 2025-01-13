import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmEditProdPage } from './adm-edit-prod.page';

const routes: Routes = [
  {
    path: '',
    component: AdmEditProdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmEditProdPageRoutingModule {}
