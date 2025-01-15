import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service'; // Importa el servicio OrderService

@Component({
  selector: 'app-detalle-prod',
  templateUrl: './detalle-prod.page.html',
  styleUrls: ['./detalle-prod.page.scss'],
  standalone: false,
})
export class DetalleProdPage implements OnInit {
  isAlertOpen = false;
  alertButtons = ['Listo'];
  product: any;  // Producto seleccionado
  toastMessage: string | null = null;  // Mensaje de toast

  constructor(
    private alertController: AlertController,
    private router: Router,
    private productService: ProductService,
    private orderService: OrderService // Inyecta OrderService
  ) {}

  ngOnInit() {
    this.product = this.productService.getProduct(); // Recupera el producto
  }

  // Método para agregar el producto al pedido
  addToOrder() {
    this.toastMessage = 'Producto agregado a tus pedidos.'; // Muestra mensaje de éxito
    this.orderService.addProductToOrder(this.product); // Agrega el producto al pedido

    // Mostrar alerta de confirmación para la cocina
    this.showConfirmationAlert();

    // Ocultar el mensaje después de 5 segundos
    setTimeout(() => {
      this.toastMessage = null;
    }, 5000);
  }

  // Muestra una alerta con el mensaje de confirmación
  async showConfirmationAlert() {
    const alert = await this.alertController.create({
      header: 'Producto agregado',
      message: 'El producto se ha agregado a tu pedido. Falta confirmación para llevarlo a la cocina.',
      buttons: ['Aceptar'],
      backdropDismiss: false,
    });

    await alert.present();
  }

  // Controla el estado de la alerta
  async setOpen(isOpen: boolean) {
    const alert = await this.alertController.create({
      header: 'Solicitud enviada',
      message: 'El mesero le atenderá en unos instantes.',
      buttons: ['OK'],
      backdropDismiss: false,
    });
    await alert.present();
  }

  // Actualiza el estado de la alerta
  setAlertOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
}
