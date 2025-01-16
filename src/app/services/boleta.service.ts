import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoletaService {
  private collectionName = 'boleta'; // Nombre de la colección en Firestore

  constructor(private firestore: AngularFirestore) {}

  // Obtener todas las boletas
  getBoletas(): Observable<any[]> {
    return this.firestore.collection(this.collectionName).valueChanges({ idField: 'id' });
  }

  // Obtener una boleta específica por su ID
  getBoletaById(id: string): Observable<any> {
    return this.firestore.collection(this.collectionName).doc(id).valueChanges();
  }

  // Agregar una boleta con los datos del usuario y los productos
  addBoleta(boleta: any): Promise<any> {
    return this.firestore.collection(this.collectionName).add(boleta);
  }

  // Actualizar una boleta existente
  updateBoleta(id: string, updatedBoleta: any): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).update(updatedBoleta);
  }

  // Eliminar una boleta por su ID
  deleteBoleta(id: string): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }
}
