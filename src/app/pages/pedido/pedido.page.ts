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
    private SolicitudService: SolicitudService 
  ) {}

  ngOnInit() {
    // Obtiene los productos del pedido
    this.order = this.orderService.getOrder();
  }

  // Muestra una alerta para solicitar un mesero
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
    if (this.order.length === 0) {
      window.alert('No hay productos en la orden');
      return;
    }

    // Obtén la fecha y hora actuales
    const currentDate = new Date();
    const hour = currentDate.getHours();
    const minute = currentDate.getMinutes();

    // Guarda los productos con la hora en la que se realizó el pedido
    const orderData = {
      productos: this.order,
      fechaHora: `${currentDate.toLocaleDateString()} ${hour}:${minute}`, // Fecha y hora en formato legible
    };

    console.log('Datos del pedido guardado:', orderData); // Incluye la hora y la fecha en la consola

    const alert = await this.alertController.create({
      header: 'Pedido confirmado',
      message: 'Tus pedidos se llevaron a la cocina. Gracias por tu paciencia.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            // Elimina todos los productos de la orden
            this.orderService.clearOrder();
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
