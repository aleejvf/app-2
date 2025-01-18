import { Component, OnInit } from '@angular/core';
import { SolicitudService } from '../../services/solicitud.service'; // Asegúrate de tener el servicio

@Component({
  selector: 'app-boleta',
  templateUrl: './boleta.page.html',
  styleUrls: ['./boleta.page.scss'],
    standalone: false,
})
export class BoletaPage implements OnInit {
  isAlertOpen = false;  // Variable para controlar la apertura de la alerta
  alertButtons = ['OK'];  // Botones de la alerta

  constructor(private solicitudService: SolicitudService) {}

  ngOnInit() {}

  // Método para abrir la alerta y crear la solicitud
  setOpen(isOpen: boolean): void {
    this.isAlertOpen = isOpen;

    if (isOpen) {
      // Obtén la información del usuario desde el localStorage
      const userInfoString = localStorage.getItem('informe'); // Extrae la información almacenada
      if (!userInfoString) {
        console.error('No se encontró información del usuario en localStorage.');
        return;
      }

      const userInfo = JSON.parse(userInfoString); // Convierte el string en objeto
      const mesa = userInfo.selectedMesa; // Obtén la mesa seleccionada del objeto userInfo

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
          
          // Aquí puedes agregar una alerta o lo que desees mostrar
        })
        .catch((error) => {
          console.error('Error al crear la solicitud:', error);
        });
    }
  }
}
