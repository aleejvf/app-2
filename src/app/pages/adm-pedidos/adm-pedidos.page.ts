import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service'; // Importa tu servicio para obtener los pedidos
import { AlertController } from '@ionic/angular'; // Importa AlertController para la confirmación

@Component({
  selector: 'app-adm-pedidos',
  templateUrl: './adm-pedidos.page.html',
  styleUrls: ['./adm-pedidos.page.scss'],
  standalone: false,
})
export class AdmPedidosPage implements OnInit {
  orders: any[] = []; // Inicializa la propiedad orders para almacenar los pedidos

  constructor(
    private orderService: OrderService, 
    private alertController: AlertController // Inyecta AlertController
  ) { }

  ngOnInit() {
    // Obtener pedidos desde el servicio
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders; // Aquí ya tienes el 'id' incluido en cada pedido
    });
  }

  // Función para eliminar un pedido
  async deleteOrder(orderId: string) {
    const alert = await this.alertController.create({
      header: 'Eliminar Pedido',
      message: '¿Estás seguro de que deseas eliminar este pedido?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Eliminación cancelada');
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.orderService.deleteOrder(orderId).then(() => {
              console.log('Pedido eliminado');
            }).catch(error => {
              console.error('Error al eliminar el pedido:', error);
            });
          }
        }
      ]
    });

    await alert.present();
  }
}
