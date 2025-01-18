import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Firebase Firestore
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Importa 'map' desde rxjs/operators

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private order: any[] = []; // Lista de productos del pedido

  constructor(private firestore: AngularFirestore) {}

  // Obtiene un pedido por su ID desde Firestore
  getOrderById(orderId: string): Observable<any> {
    return this.firestore
      .collection('pedidos')
      .doc(orderId)
      .snapshotChanges()
      .pipe(
        map(doc => {
          const data = doc.payload.data() as Record<string, any>;
          const id = doc.payload.id;
          return { id, ...data }; // Devuelve el pedido con su ID
        })
      );
  }

  // Otros métodos existentes (sin cambios)
  getOrders(): Observable<any[]> {
    return this.firestore.collection('pedidos').snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Record<string, any>;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  deleteOrder(orderId: string): Promise<void> {
    return this.firestore
      .collection('pedidos')
      .doc(orderId)
      .delete()
      .then(() => {
        console.log(`Pedido ${orderId} eliminado de la base de datos`);
      }).catch((error) => {
        console.error(`Error al eliminar el pedido ${orderId}:`, error);
      });
  }

  addProductToOrder(product: any) {
    this.order.push({ product });
  }

  getOrder() {
    return this.order;
  }

  removeProductFromOrder(index: number) {
    this.order.splice(index, 1);
  }

  clearOrder() {
    this.order = [];
    localStorage.setItem('order', JSON.stringify(this.order));
  }

  saveOrderToFirebase(orderData: any): Promise<any> {
    return this.firestore.collection('pedidos').add(orderData);
  }

  addProductToPedido(pedidoId: string, product: any): Promise<any> {
    return this.firestore
      .collection('pedidos')
      .doc(pedidoId)
      .collection('producto')
      .add(product)
      .then((docRef) => {
        console.log("Producto agregado con ID: ", docRef.id);
        return docRef;
      })
      .catch((error) => {
        console.error("Error al agregar producto: ", error);
        return Promise.reject(error);
      });
  }

  // Actualización del método para obtener productos desde la subcolección 'producto' > 'product'
  getProductosFromOrder(pedidoId: string): Observable<any[]> {
    return this.firestore
      .collection('pedidos')
      .doc(pedidoId)
      .collection('producto')  // Accede a la subcolección 'producto'
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Record<string, any>;
            const id = a.payload.doc.id;

            // Ahora accedemos a la subcolección 'product' de cada producto
            return this.firestore
              .collection('pedidos')
              .doc(pedidoId)
              .collection('producto')
              .doc(id)
              .collection('product')
              .snapshotChanges()
              .pipe(
                map(productActions =>
                  productActions.map(productAction => {
                    const productData = productAction.payload.doc.data() as Record<string, any>;
                    return { id: productAction.payload.doc.id, ...productData };
                  })
                )
              );
          })
        )
      );
  }

  removeProductFromPedido(pedidoId: string, productId: string): Promise<void> {
    return this.firestore
      .collection('pedidos')
      .doc(pedidoId)
      .collection('producto')
      .doc(productId)
      .delete()
      .then(() => {
        console.log(`Producto ${productId} eliminado del pedido ${pedidoId}`);
      })
      .catch((error) => {
        console.error(`Error al eliminar el producto ${productId}:`, error);
        return Promise.reject(error);
      });
  }

  updateProductInPedido(pedidoId: string, productId: string, productData: any): Promise<void> {
    return this.firestore
      .collection('pedidos')
      .doc(pedidoId)
      .collection('producto')
      .doc(productId)
      .update(productData)
      .then(() => {
        console.log(`Producto ${productId} actualizado en el pedido ${pedidoId}`);
      })
      .catch((error) => {
        console.error(`Error al actualizar el producto ${productId}:`, error);
        return Promise.reject(error);
      });
  }
}
