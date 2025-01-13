import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmEditProdPageRoutingModule } from './adm-edit-prod-routing.module';

import { AdmEditProdPage } from './adm-edit-prod.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmEditProdPageRoutingModule
  ],
  declarations: [AdmEditProdPage]
})
export class AdmEditProdPageModule {}
