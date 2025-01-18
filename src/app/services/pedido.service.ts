import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {

  constructor(private firestore: AngularFirestore) {}

  // Método para obtener todos los pedidos
  getPedidos(): Observable<any[]> {
    return this.firestore.collection('pedidos').snapshotChanges();
  }

  // Método para obtener los productos de un pedido específico
  getProductosDePedido(pedidoId: string): Observable<any[]> {
    return this.firestore
      .collection('pedidos')
      .doc(pedidoId)
      .collection('producto')
      .snapshotChanges();
  }

  // Método para agregar un nuevo pedido
  agregarPedido(pedidoData: any): Promise<any> {
    return this.firestore.collection('pedidos').add(pedidoData);
  }

  // Método para agregar un producto a un pedido específico
  agregarProductoAOrden(pedidoId: string, productoData: any): Promise<any> {
    return this.firestore
      .collection('pedidos')
      .doc(pedidoId)
      .collection('producto')
      .add(productoData);
  }

  // Método para actualizar un pedido
  actualizarPedido(pedidoId: string, pedidoData: any): Promise<void> {
    return this.firestore
      .collection('pedidos')
      .doc(pedidoId)
      .update(pedidoData);
  }

  // Método para eliminar un pedido
  eliminarPedido(pedidoId: string): Promise<void> {
    return this.firestore
      .collection('pedidos')
      .doc(pedidoId)
      .delete();
  }

  // Método para eliminar un producto de un pedido
  eliminarProductoDePedido(pedidoId: string, productoId: string): Promise<void> {
    return this.firestore
      .collection('pedidos')
      .doc(pedidoId)
      .collection('producto')
      .doc(productoId)
      .delete();
  }
}
