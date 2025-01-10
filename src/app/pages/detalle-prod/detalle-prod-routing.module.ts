import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleProdPage } from './detalle-prod.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleProdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleProdPageRoutingModule {}
