import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
  standalone: false
})
export class CreateUserPage implements OnInit {

  constructor(private alertController: AlertController, private router: Router) { }

  ngOnInit() { }

  async crearCuenta() {
    // Muestra la alerta de confirmación
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Se ha creado tu cuenta correctamente.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            // Redirige a la página de login
            this.router.navigate(['/login']);
          }
        }
      ],
      backdropDismiss: false // Evita cerrar tocando fuera de la alerta
    });

    await alert.present();
  }
}
