import { Component, OnInit } from '@angular/core';
import { BoletaService } from '../../services/boleta.service';
import { SolicitudService } from '../../services/solicitud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boleta',
  templateUrl: './boleta.page.html',
  styleUrls: ['./boleta.page.scss'],
  standalone: false,
})
export class BoletaPage implements OnInit {
  boleta: any[] = [];
  numeroBoleta: string = '';
  fechaBoleta: string = '';
  isAlertOpenSolicitud = false; // Nueva alerta para la solicitud al mesero
  isAlertOpenPago = false; // Alerta para el pago con éxito
  alertButtonsSolicitud: any[] = []; // Botones de la alerta de solicitud al mesero
  alertButtonsPago: any[] = []; // Botones de la alerta de pago con éxito

  constructor(
    private solicitudService: SolicitudService,
    private boletaService: BoletaService,
    private router: Router
  ) {}

  ngOnInit() {
    this.numeroBoleta = Math.floor(Math.random() * 100000).toString();
    const currentDate = new Date();
    this.fechaBoleta = currentDate.toLocaleDateString();
    const boletaData = JSON.parse(localStorage.getItem('boleta') || '[]');
    this.boleta = boletaData;
  }

  // Método para abrir la alerta y crear la solicitud
  setOpen(isOpen: boolean): void {
    this.isAlertOpenSolicitud = isOpen; // Activar la alerta de solicitud al mesero

    if (isOpen) {
      const userInfoString = localStorage.getItem('informe');
      if (!userInfoString) {
        console.error('No se encontró información del usuario en localStorage.');
        return;
      }

      const userInfo = JSON.parse(userInfoString);
      const mesa = userInfo.selectedMesa;

      if (!mesa) {
        console.error('No se encontró la mesa seleccionada en la información del usuario.');
        return;
      }

      const now = new Date();
      const hora = now.getHours().toString().padStart(2, '0');
      const minuto = now.getMinutes().toString().padStart(2, '0');

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

  // Método para guardar la boleta en Firebase
  guardarBoleta() {
    const userInfoString = localStorage.getItem('informe');
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
    const mesa = userInfo?.selectedMesa || 'Mesa no seleccionada';

    const boletaData = {
      numeroBoleta: this.numeroBoleta,
      fechaBoleta: this.fechaBoleta,
      productos: this.boleta.map(item => ({
        title: item.product?.title,
        price: item.product?.price,
      })),
      total: this.calcularTotal(),
      mesa: mesa,
    };

    this.boletaService.guardarBoleta(boletaData)
      .then(() => {
        console.log('Boleta guardada con éxito');

        // Mostramos la alerta de pago con éxito
        this.isAlertOpenPago = true; // Mostrar la alerta de pago con éxito
        this.alertButtonsPago = [
          {
            text: 'OK',
            handler: () => {
              localStorage.clear(); // Limpiamos el localStorage
              this.router.navigate(['/login']); // Redirigimos al login
            }
          }
        ];
      })
      .catch((error) => {
        console.error('Error al guardar la boleta:', error);
      });
  }

  // Método para calcular el total
  calcularTotal(): number {
    return this.boleta.reduce((total, item) => total + (item.product?.price || 0), 0);
  }
}
