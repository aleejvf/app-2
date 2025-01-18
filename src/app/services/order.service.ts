// src/app/services/order.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Firebase Firestore
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private order: any[] = []; // Lista de productos del pedido

  constructor(private firestore: AngularFirestore) {}

  // Agrega un producto al pedido
  addProductToOrder(product: any) {
    this.order.push({ product });
  }

  // Obtiene todos los productos del pedido
  getOrder() {
    return this.order;
  }

  // Elimina un producto del pedido
  removeProductFromOrder(index: number) {
    this.order.splice(index, 1);
  }

  // Limpia la orden
  clearOrder() {
    this.order = []; // Vacía la lista de productos
    localStorage.setItem('order', JSON.stringify(this.order)); // Guarda la orden vacía en el almacenamiento local si es necesario
  }

  // Guarda el pedido en la colección de Firebase
  saveOrderToFirebase(orderData: any): Promise<any> {
    return this.firestore.collection('pedidos').add(orderData);
  }

  // Agrega un producto a la subcolección 'producto' dentro de un pedido específico
  addProductToPedido(pedidoId: string, product: any): Promise<any> {
    return this.firestore
      .collection('pedidos')
      .doc(pedidoId)
      .collection('producto')
      .add(product);
  }
}
