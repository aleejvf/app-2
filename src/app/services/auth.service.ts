import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Importación correcta
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth, // Servicio de autenticación
    private router: Router,
    private alertController: AlertController
  ) { }

  // Método para crear un nuevo usuario
  crearUsuario(email: string, password: string) {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        const alert = await this.alertController.create({
          header: 'Éxito',
          message: 'Se ha creado tu cuenta correctamente.',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.router.navigate(['/login']);
              }
            }
          ],
          backdropDismiss: false // Evita cerrar tocando fuera de la alerta
        });

        await alert.present();
      })
      .catch(async (error) => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: error.message,
          buttons: ['OK']
        });

        await alert.present();
      })
    );
  }

  // Método para iniciar sesión con correo y contraseña
  login(email: string, password: string) {
    return from(this.afAuth.signInWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        this.router.navigate(['/home']); // Cambia '/home' por la ruta deseada
      })
      .catch(async (error) => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: error.message,
          buttons: ['OK']
        });

        await alert.present();
      })
    );
  }

  // Método para cerrar sesión
  logout() {
    return from(this.afAuth.signOut()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(async (error) => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: error.message,
          buttons: ['OK']
        });

        await alert.present();
      })
    );
  }

  // Nuevo método para restablecer la contraseña
  resetPassword(email: string) {
    return from(this.afAuth.sendPasswordResetEmail(email)
      .then(async () => {
        const alert = await this.alertController.create({
          header: 'Éxito',
          message: 'Se ha enviado un enlace para restablecer la contraseña a tu correo.',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                // Redirige al usuario a la página de inicio de sesión
                this.router.navigate(['/login']);
              }
            }
          ]
        });
  
        await alert.present();
      })
      .catch(async (error) => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: error.message,
          buttons: ['OK']
        });
  
        await alert.present();
      })
    );
  }
  
  
}
