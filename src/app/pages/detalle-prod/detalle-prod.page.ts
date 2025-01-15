import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-prod',
  templateUrl: './detalle-prod.page.html',
  styleUrls: ['./detalle-prod.page.scss'],
  standalone: false,
})
export class DetalleProdPage implements OnInit {
  isAlertOpen = false;
  alertButtons = ['Listo'];

  constructor(private alertController: AlertController, private router: Router) {}

  ngOnInit() {}
  

  // Muestra una alerta que indica que el producto fue agregado pero falta confirmar
  async showAddToOrderAlert() {
    const alert = await this.alertController.create({
      header: 'Producto agregado',
      message: 'Este producto se agregó a tu pedido, pero aún falta que lo confirmes para que se lleve a la cocina.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigateByUrl('/menu'); // Redirigir a la página del menú
          },
        },
      ],
      backdropDismiss: false, // Deshabilita el clic en el fondo
    });

    await alert.present();
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
}
