// src/app/pages/pedido/pedido.page.ts
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service'; // Importa el servicio OrderService

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
  standalone: false,
})
export class PedidoPage implements OnInit {
  order: any[] = [];  // Almacena los productos del pedido

  constructor(
    private alertController: AlertController,
    private router: Router,
    private orderService: OrderService // Inyecta OrderService
  ) {}

  ngOnInit() {
    this.order = this.orderService.getOrder(); // Obtiene los productos del pedido
  }

  // Muestra una alerta para solicitar un mesero
  async setOpen(isOpen: boolean) {
    const alert = await this.alertController.create({
      header: 'Solicitud enviada',
      message: 'El mesero le atenderá en unos instantes.',
      buttons: ['OK'],
      backdropDismiss: false,
    });
    await alert.present();
  }

  // Muestra un modal para confirmar la eliminación
  async presentDeleteModal(index: number) {
    const alert = await this.alertController.create({
      header: '¿Eliminar producto?',
      message: '¿Estás seguro de que quieres eliminar este producto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.orderService.removeProductFromOrder(index); // Elimina el producto
            this.order = this.orderService.getOrder(); // Actualiza la lista de productos
          },
        },
      ],
      backdropDismiss: false,
    });
    await alert.present();
  }

  // Muestra un mensaje de confirmación del pedido
  async confirmOrder() {
    const alert = await this.alertController.create({
      header: 'Pedido confirmado',
      message: 'Tus pedidos se llevaron a la cocina. Gracias por tu paciencia.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigateByUrl('/menu'); // Redirige al menú
          },
        },
      ],
      backdropDismiss: false,
    });
    await alert.present();
  }
}
