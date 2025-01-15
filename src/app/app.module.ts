import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentModule } from './component/component.module';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage'; // Importar AngularFireStorageModule
import { environment } from 'src/environments/environment.prod';
import { RouterModule } from '@angular/router';
// Importa FormsModule y ReactiveFormsModule
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ComponentModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,  // Agregado aquí
    FormsModule,  // <-- Agregado aquí
    ReactiveFormsModule, // <-- Agregado aquí
    RouterModule, 
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
