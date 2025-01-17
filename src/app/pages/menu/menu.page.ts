import { Component, OnInit } from '@angular/core';
import { SolicitudService } from '../../services/solicitud.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: false,
})
export class MenuPage implements OnInit {
  isAlertOpen = false; // Controla si la alerta está abierta
  alertButtons = ['Listo']; // Botón para cerrar la alerta

  constructor(private solicitudService: SolicitudService) {}

  ngOnInit() {}

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
      this.solicitudService
        .createSolicitud(hora, minuto, mesa)
        .then(() => {
          console.log('Solicitud creada con éxito:', { hora, minuto, mesa });
        })
        .catch((error) => {
          console.error('Error al crear la solicitud:', error);
        });
    }
  }

  filtro(algo: string): void {
    console.log(algo);
  
    // Verificar si ya existe un valor en localStorage
    let filtroGuardado = localStorage.getItem('filtro');
  
    if (filtroGuardado) {
      // Si existe, actualizamos el valor con el nuevo dato
      localStorage.setItem('filtro', algo);
    } else {
      // Si no existe, guardamos el nuevo valor por primera vez
      localStorage.setItem('filtro', algo);
    }
  }
  
}
