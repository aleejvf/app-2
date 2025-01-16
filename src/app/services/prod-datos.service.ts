import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdDatosService {
  private collectionName = 'productos'; // Nombre de la colección en Firestore
  private selectedProduct: any; // Producto temporalmente seleccionado

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

  updateProduct(productId: string, product: any): Promise<void> {
    const productRef = this.firestore.collection(this.collectionName).doc(productId);
  
    // Comprobar si el producto existe
    return productRef.get().toPromise().then(docSnapshot => {
      if (!docSnapshot.exists) {
        throw new Error('Producto no encontrado');
      }
  
      // Si el producto existe, actualizamos
      return productRef.update(product);
    }).catch(error => {
      // Si ocurre un error (producto no encontrado o error en la actualización)
      console.error('Error al actualizar el producto:', error);
      throw error; // Lanza el error para que el componente pueda manejarlo
    });
  }

  // Guardar el producto seleccionado temporalmente
  setSelectedProduct(product: any): void {
    this.selectedProduct = product;
  }

  // Obtener el producto seleccionado
  getSelectedProduct(): any {
    return this.selectedProduct;
  }

  // Método para obtener un producto específico por ID
  getProductById(productId: string): Observable<any> {
    return this.firestore.collection(this.collectionName).doc(productId).valueChanges();
  }
}
