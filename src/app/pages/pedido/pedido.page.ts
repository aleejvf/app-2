import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
  standalone: false
})
export class PedidoPage implements OnInit {

  // Almacenar las cantidades de los productos
  quantity1: number = 1;  // Producto 1
  quantity2: number = 2;  // Producto 2

  constructor() { }

  ngOnInit() {
  }

  // Función para incrementar la cantidad
  increaseQuantity(productId: number) {
    if (productId === 1) {
      this.quantity1++;  // Aumentar cantidad de Producto 1
    } else if (productId === 2) {
      this.quantity2++;  // Aumentar cantidad de Producto 2
    }
  }

  // Función para decrementar la cantidad
  decreaseQuantity(productId: number) {
    if (productId === 1 && this.quantity1 > 1) {
      this.quantity1--;  // Disminuir cantidad de Producto 1 si es mayor que 1
    } else if (productId === 2 && this.quantity2 > 1) {
      this.quantity2--;  // Disminuir cantidad de Producto 2 si es mayor que 1
    }
  }

}
