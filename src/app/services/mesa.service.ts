import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MesaService {
  private collectionName = 'mesas'; // Nombre de la colección en Firestore

  constructor(private firestore: AngularFirestore) {}

  // Método para obtener todas las mesas con el campo 'n.mesas'
  getMesas(): Observable<any[]> {
    return this.firestore.collection(this.collectionName).valueChanges({ idField: 'id' });
  }

  // Método para obtener mesas filtradas por el campo 'n.mesas' si lo necesitas
  getMesasPorNumero(nMesas: number): Observable<any[]> {
    return this.firestore
      .collection(this.collectionName, ref => ref.where('n.mesas', '==', nMesas))
      .valueChanges({ idField: 'id' });
  }
}
