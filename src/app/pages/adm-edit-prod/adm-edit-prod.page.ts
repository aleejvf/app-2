import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-adm-edit-prod',
  templateUrl: './adm-edit-prod.page.html',
  styleUrls: ['./adm-edit-prod.page.scss'],
  standalone: false
})
export class AdmEditProdPage implements OnInit {

  constructor(private alertController: AlertController, private router: Router) { }

  ngOnInit() {
  }

  async guardarProducto() {
    // Muestra la alerta
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: 'Producto guardado correctamente',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            // Redirige a la página adm-produc
            this.router.navigate(['/adm-produc']);
          },
        },
      ],
      backdropDismiss: false, // Evita cerrar tocando fuera del modal
    });

    await alert.present();
  }
}
