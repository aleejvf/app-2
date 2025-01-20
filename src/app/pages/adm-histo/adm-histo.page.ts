import { Component, OnInit } from '@angular/core';
import { BoletaService } from '../../services/boleta.service'; // Asegúrate de importar el servicio
import { Observable } from 'rxjs';

@Component({
  selector: 'app-adm-histo',
  templateUrl: './adm-histo.page.html',
  styleUrls: ['./adm-histo.page.scss'],
  standalone: false,
})
export class AdmHistoPage implements OnInit {

  historialVentas: any[] = [];  // Aquí almacenaremos las boletas
  mesaSeleccionada: string = ''; // Para el filtro de mesa
  fechaSeleccionada: string = ''; // Para el filtro de fecha

  constructor(private boletaService: BoletaService) { }

  ngOnInit() {
    this.cargarHistorial();  // Cargamos el historial de ventas al inicializar la página
  }

  cargarHistorial() {
    // Obtenemos las boletas de Firebase
    this.boletaService.obtenerBoletas().subscribe(data => {
      this.historialVentas = data;
    });
  }

  // Aquí puedes agregar cualquier filtro si es necesario
  aplicarFiltros() {
    let ventasFiltradas = this.historialVentas;

    // Filtro por mesa
    if (this.mesaSeleccionada) {
      ventasFiltradas = ventasFiltradas.filter(venta => venta.mesa === this.mesaSeleccionada);
    }

    // Filtro por fecha
    if (this.fechaSeleccionada) {
      ventasFiltradas = ventasFiltradas.filter(venta => venta.fechaBoleta === this.fechaSeleccionada);
    }

    // Actualiza el historial con las ventas filtradas
    this.historialVentas = ventasFiltradas;
  }

  // Método para resetear los filtros
  resetearFiltros() {
    this.mesaSeleccionada = '';
    this.fechaSeleccionada = '';
    this.cargarHistorial(); // Recargar todos los registros sin filtros
  }
}
