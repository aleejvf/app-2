import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone : false
})
export class LoginPage implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  async onLogin() {
    // Obtener los valores del formulario
    const email = this.form.value.email;
    const password = this.form.value.password;

    // Validar que el formulario no sea inválido
    if (this.form.invalid) {
      this.showAlert('Error', 'Por favor completa todos los campos correctamente.');
      return;
    }

    try {
      // Intentar iniciar sesión con Firebase Authentication
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email!, password!);

      // Redirigir a la página QR si la autenticación es exitosa
      console.log('Usuario autenticado:', userCredential.user);
      this.router.navigate(['/qr']);
    } catch (error) {
      // Mostrar alerta si ocurre un error (email o contraseña incorrectos)
      console.error('Error de autenticación:', error);
      this.showAlert('Error', 'Correo o contraseña no válidos. Intenta de nuevo.');
    }
  }

  // Método para mostrar una alerta
  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
