import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service'; // Importa el servicio OrderService
import { SolicitudService } from '../../services/solicitud.service';

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
    private orderService: OrderService, // Inyecta OrderService
    private SolicitudService: SolicitudService
  ) {}

  ngOnInit() {
    this.product = this.productService.getProduct(); // Recupera el producto
  }

  // Método para agregar el producto al pedido
  addToOrder() {
    this.toastMessage = 'Producto agregado a tus pedidos.'; // Muestra mensaje de éxito
    this.orderService.addProductToOrder(this.product); // Agrega el producto al pedido

    // Mostrar alerta de confirmación
    this.showConfirmationAlert();

    // Ocultar el mensaje después de 5 segundos
    setTimeout(() => {
      this.toastMessage = null;
    }, 5000);
  }

// Método para abrir la alerta y crear la solicitud
setOpen(isOpen: boolean): void {
  this.isAlertOpen = isOpen;

  if (isOpen) {
    // Obtén la mesa desde el localStorage
    const userInfoString = localStorage.getItem('informe'); // Extrae la información almacenada
    if (!userInfoString) {
      console.error('No se encontró información del usuario en localStorage.');
      return;
    }

    const userInfo = JSON.parse(userInfoString); // Convierte el string en objeto
    const mesa = userInfo.selectedMesa; // Obtén el valor de la mesa

    if (!mesa) {
      console.error('No se encontró la mesa seleccionada en la información del usuario.');
      return;
    }

    // Obtén la hora y el minuto actuales
    const now = new Date();
    const hora = now.getHours().toString().padStart(2, '0');
    const minuto = now.getMinutes().toString().padStart(2, '0');

    // Crea la solicitud en Firebase
    this.SolicitudService
      .createSolicitud(hora, minuto, mesa)
      .then(() => {
        console.log('Solicitud creada con éxito:', { hora, minuto, mesa });
      })
      .catch((error) => {
        console.error('Error al crear la solicitud:', error);
      });
  }
}

  // Mostrar una alerta de confirmación después de agregar un producto al pedido
  async showConfirmationAlert() {
    const alert = await this.alertController.create({
      header: 'Producto agregado',
      message: 'El producto se ha agregado a tu pedido. Falta confirmación para llevarlo a la cocina.',
      buttons: ['Aceptar'],
      backdropDismiss: false,
    });

    await alert.present();
  }

  // Actualizar el estado de la alerta
  setAlertOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
}
