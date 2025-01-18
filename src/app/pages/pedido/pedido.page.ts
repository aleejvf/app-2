import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service'; // Importa el servicio OrderService
import { SolicitudService } from '../../services/solicitud.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
  standalone: false,
})
export class PedidoPage implements OnInit {
  isAlertOpen = false;
  order: any[] = []; // Almacena los productos del pedido

  constructor(
    private alertController: AlertController,
    private router: Router,
    private orderService: OrderService, // Inyecta OrderService
    private solicitudService: SolicitudService
  ) {}

  ngOnInit() {
    // Obtiene los productos del pedido
    this.order = this.orderService.getOrder();
  }

  // Muestra una alerta para solicitar un mesero
  setOpen(isOpen: boolean): void {
    this.isAlertOpen = isOpen;

    if (isOpen) {
      const userInfoString = localStorage.getItem('informe');
      if (!userInfoString) {
        console.error('No se encontró información del usuario en localStorage.');
        return;
      }

      const userInfo = JSON.parse(userInfoString);
      const mesa = userInfo.selectedMesa;

      if (!mesa) {
        console.error('No se encontró la mesa seleccionada en la información del usuario.');
        return;
      }

      const now = new Date();
      const hora = now.getHours().toString().padStart(2, '0');
      const minuto = now.getMinutes().toString().padStart(2, '0');

      this.solicitudService
        .createSolicitud(hora, minuto, mesa)
        .then(() => {
          console.log('Solicitud creada con éxito:', { hora, minuto, mesa });
        })
        .catch((error) => {
          console.error('Error al crear la solicitud:', error);
        });
    }
  }

  // Muestra un modal para confirmar la eliminación de un producto
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
            this.orderService.removeProductFromOrder(index);
            this.order = this.orderService.getOrder();
          },
        },
      ],
      backdropDismiss: false,
    });
    await alert.present();
  }

  // Muestra un mensaje de confirmación del pedido
  async confirmOrder() {
    if (this.order.length === 0) {
      window.alert('No hay productos en la orden');
      return;
    }

    // Obtiene la fecha y hora actuales
    const currentDate = new Date();
    const hour = currentDate.getHours();
    const minute = currentDate.getMinutes();

    // Obtén la mesa del localStorage
    const userInfoString = localStorage.getItem('informe');
    const userInfo = JSON.parse(userInfoString || '{}');
    const mesa = userInfo.selectedMesa;

    // Crea el objeto del pedido
    const orderData = {
      mesa: mesa,
      fechaHora: `${hour}:${minute}`, // Fecha y hora en formato legible
      productos: [], // Este campo se llenará con los productos en la subcolección
    };

    // Guarda el pedido en Firebase con un ID único
    const pedidoRef = await this.orderService.saveOrderToFirebase(orderData);

    // Ahora, agrega los productos a la subcolección 'producto' de este pedido
    for (const product of this.order) {
      await this.orderService.addProductToPedido(pedidoRef.id, product);
    }

    const alert = await this.alertController.create({
      header: 'Pedido confirmado',
      message: 'Tus pedidos se llevaron a la cocina. Gracias por tu paciencia.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.orderService.clearOrder(); // Elimina todos los productos de la orden
            this.order = this.orderService.getOrder(); // Actualiza la lista de productos
            this.router.navigateByUrl('/menu'); // Redirige al menú
          },
        },
      ],
      backdropDismiss: false,
    });
    await alert.present();
  }
}
