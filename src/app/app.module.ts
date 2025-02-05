import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentModule } from './component/component.module';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage'; // Importar AngularFireStorageModule
import { AngularFireAuthModule } from '@angular/fire/compat/auth'; // Importa el módulo de autenticación
import { environment } from 'src/environments/environment.prod';
import { RouterModule } from '@angular/router';
// Importa FormsModule y ReactiveFormsModule
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Importa HttpClientModule para las solicitudes HTTP
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ComponentModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,  // Agregado aquí
    AngularFireAuthModule, // Agregado aquí
    FormsModule,  // <-- Agregado aquí
    ReactiveFormsModule, // <-- Agregado aquí
    RouterModule,
    HttpClientModule,  // <-- Asegúrate de agregar HttpClientModule aquí
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
