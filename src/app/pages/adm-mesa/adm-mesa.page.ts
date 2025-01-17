import { Component, OnInit } from '@angular/core';
import { SolicitudService } from '../../services/solicitud.service';

@Component({
  selector: 'app-adm-mesa',
  templateUrl: './adm-mesa.page.html',
  styleUrls: ['./adm-mesa.page.scss'],
  standalone: false,
})
export class AdmMesaPage implements OnInit {
  solicitudes: any[] = []; // Lista de solicitudes

  constructor(private solicitudService: SolicitudService) {}

  ngOnInit() {
    this.loadSolicitudes(); // Carga las solicitudes al inicializar el componente
  }

  // Cargar todas las solicitudes
  loadSolicitudes(): void {
    this.solicitudService.getSolicitudes().subscribe(
      (data) => {
        this.solicitudes = data;
        console.log('Solicitudes cargadas:', this.solicitudes);
      },
      (error) => {
        console.error('Error al cargar las solicitudes:', error);
      }
    );
  }

  // Eliminar una solicitud por ID
  eliminarSolicitud(id: string): void {
    this.solicitudService.deleteSolicitud(id).then(
      () => {
        console.log('Solicitud eliminada con éxito.');
        this.solicitudes = this.solicitudes.filter((solicitud) => solicitud.id !== id);
      },
      (error) => {
        console.error('Error al eliminar la solicitud:', error);
      }
    );
  }
}
