import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
  standalone: false,
})
export class PedidoPage implements OnInit {
  constructor(private alertController: AlertController, private router: Router) {}

  ngOnInit() {}

  // Muestra una alerta para solicitar un mesero
  async setOpen(isOpen: boolean) {
    const alert = await this.alertController.create({
      header: 'Solicitud enviada',
      message: 'El mesero le atenderá en unos instantes.',
      buttons: ['OK'],
      backdropDismiss: false, // Evita que se cierre al presionar fuera de la alerta
    });
    await alert.present();
  }

  // Muestra un modal para confirmar la eliminación
  async presentDeleteModal() {
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
            console.log('Producto eliminado');
          },
        },
      ],
      backdropDismiss: false, // Evita que se cierre al presionar fuera de la alerta
    });
    await alert.present();
  }

  // Muestra un mensaje de confirmación del pedido
  async confirmOrder() {
    console.log('Botón presionado');
    const alert = await this.alertController.create({
      header: 'Pedido confirmado',
      message: 'Tus pedidos se llevaron a la cocina. Gracias por tu paciencia.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            // Redirige a la página del menú
            this.router.navigateByUrl('/menu');
          },
        },
      ],
      backdropDismiss: false, // Evita que se cierre al presionar fuera de la alerta
    });
    await alert.present();
  }
}
