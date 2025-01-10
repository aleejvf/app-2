import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleProdPageRoutingModule } from './detalle-prod-routing.module';

import { DetalleProdPage } from './detalle-prod.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleProdPageRoutingModule
  ],
  declarations: [DetalleProdPage]
})
export class DetalleProdPageModule {}
