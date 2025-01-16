import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MesaService {
  private collectionName = 'mesas'; // Nombre de la colección en Firestore
  private selectedMesa: number | null = null; // Almacena la mesa seleccionada en memoria

  constructor(private firestore: AngularFirestore) {}

  // Método para obtener todas las mesas con el campo 'n.mesas'
  getMesas(): Observable<any[]> {
    return this.firestore.collection(this.collectionName).valueChanges({ idField: 'id' });
  }

  // Método para obtener mesas filtradas por el campo 'n.mesas'
  getMesasPorNumero(nMesas: number): Observable<any[]> {
    return this.firestore
      .collection(this.collectionName, ref => ref.where('n.mesas', '==', nMesas))
      .valueChanges({ idField: 'id' });
  }

  // Nuevo: Establece la mesa seleccionada
  setSelectedMesa(mesa: number): void {
    this.selectedMesa = mesa;
  }

  // Nuevo: Obtiene la mesa seleccionada
  getSelectedMesa(): number | null {
    return this.selectedMesa;
  }
}
