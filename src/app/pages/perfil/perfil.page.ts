import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Servicio de Firebase Authentication
import { Router } from '@angular/router';
import { SolicitudService } from '../../services/solicitud.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false,
})
export class PerfilPage implements OnInit {
  user: any; // Objeto para almacenar los datos del usuario autenticado
  isAlertOpen = false;
  alertButtons = ['Listo'];

  constructor(
    private afAuth: AngularFireAuth,
     private router: Router,
     private SolicitudService: SolicitudService
    ) {}

  ngOnInit() {
    this.getUserInfo(); // Llamar al método para obtener los datos del usuario
  }

  // Método para abrir la alerta y crear la solicitud
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

  // Obtener los datos del usuario autenticado
  getUserInfo() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user; // Guardar los datos del usuario en la variable `user`
      } else {
        // Si no hay un usuario autenticado, redirigir al login
        this.router.navigate(['/login']);
      }
    });
  }

  // Método para cerrar sesión
  // Método para borrar el localStorage y redirigir al login
  goBack(): void {
    localStorage.clear(); // Borra todos los datos del localStorage
    console.log('Datos borrados del localStorage.');
    this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
  }
}
