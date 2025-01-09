import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoletaPageRoutingModule } from './boleta-routing.module';

import { BoletaPage } from './boleta.page';
import { ComponentModule } from 'src/app/component/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoletaPageRoutingModule,
    ComponentModule
  ],
  declarations: [BoletaPage]
})
export class BoletaPageModule {}
