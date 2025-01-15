import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';  // Importar el servicio
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
  standalone: false
})
export class CreateUserPage implements OnInit {

  email: string = '';
  fullName: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private authService: AuthService,  // Inyectar el servicio
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {}

  async crearCuenta() {
    if (this.password !== this.confirmPassword) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Las contraseñas no coinciden.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    this.authService.crearUsuario(this.email, this.password)
      .subscribe(() => {
        // Redirigir si es exitoso, ya se maneja en el servicio
      });
  }
}
