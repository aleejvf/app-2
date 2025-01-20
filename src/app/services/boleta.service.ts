import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoletaService {

  constructor(private firestore: AngularFirestore) {}

  // Método para guardar la boleta en Firebase
  guardarBoleta(boleta: any): Promise<any> {
    return this.firestore.collection('boleta').add(boleta);
  }

  // Método para obtener las boletas de Firebase
  obtenerBoletas(): Observable<any[]> {
    return this.firestore.collection('boleta').valueChanges();
  }
}
