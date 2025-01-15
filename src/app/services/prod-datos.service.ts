import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdDatosService {
  private collectionName = 'productos'; // Nombre de la colección en Firestore

  constructor(private firestore: AngularFirestore) {}

  // Método para agregar un producto
  addProduct(product: any): Promise<any> {
    return this.firestore.collection(this.collectionName).add(product);
  }

  // Método para obtener todos los productos
  getProducts(): Observable<any[]> {
    return this.firestore.collection(this.collectionName).valueChanges({ idField: 'id' });
  }

  // Método para eliminar un producto
  deleteProduct(productId: string): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(productId).delete();
  }

  // Método para actualizar un producto
  updateProduct(productId: string, product: any): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(productId).update(product);
  }
}
