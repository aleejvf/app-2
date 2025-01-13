import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmDetaProdPageRoutingModule } from './adm-deta-prod-routing.module';

import { AdmDetaProdPage } from './adm-deta-prod.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmDetaProdPageRoutingModule
  ],
  declarations: [AdmDetaProdPage]
})
export class AdmDetaProdPageModule {}
