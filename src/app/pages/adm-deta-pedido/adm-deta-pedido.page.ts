import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Para obtener el ID de la URL
import { OrderService } from 'src/app/services/order.service'; // Servicio de pedidos

@Component({
  selector: 'app-adm-deta-pedido',
  templateUrl: './adm-deta-pedido.page.html',
  styleUrls: ['./adm-deta-pedido.page.scss'],
  standalone: false,
})
export class AdmDetaPedidoPage implements OnInit {
  productos: any[] = []; // Lista de productos del pedido
  order: any = null; // Detalles del pedido seleccionado
  pedidoId: string | null = null; // ID del pedido

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    // Obtener el ID del pedido desde la URL
    this.pedidoId = this.route.snapshot.paramMap.get('id');
    if (this.pedidoId) {
      this.getOrderDetails(this.pedidoId);
    }
  }

  // Obtiene los detalles del pedido y sus productos
  getOrderDetails(id: string) {
    console.log('Obteniendo detalles del pedido con ID:', id); // Impresión inicial

    this.orderService.getOrderById(id).subscribe(
      (order) => {
        this.order = order; // Detalles del pedido
        console.log('Detalles del pedido:', this.order); // Muestra los detalles del pedido en consola

        // Obtiene los productos de la subcolección 'producto' > 'product'
        this.orderService.getProductosFromOrder(id).subscribe(
          (productos) => {
            console.log(productos);
            this.productos = productos; // Lista de productos
            console.log('Productos obtenidos:', this.productos); // Muestra los productos obtenidos en consola
          },
          (error) => {
            console.error('Error al obtener los productos:', error); // En caso de error
          }
        );
      },
      (error) => {
        console.error('Error al obtener los detalles del pedido:', error); // En caso de error
      }
    );
  }
}
