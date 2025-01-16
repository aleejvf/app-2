// src/app/services/order.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private order: any[] = []; // Asegúrate de que el tipo sea más específico si lo necesitas

  constructor() {}

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
  clearOrder() {
    this.order = []; // Vacía la lista de productos
    localStorage.setItem('order', JSON.stringify(this.order)); // Guarda la orden vacía en el almacenamiento local si es necesario
  }
}
