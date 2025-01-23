import { Component, OnInit } from '@angular/core';
import { BoletaService } from '../../services/boleta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adm-histo',
  templateUrl: './adm-histo.page.html',
  styleUrls: ['./adm-histo.page.scss'],
  standalone: false,
})
export class AdmHistoPage implements OnInit {
  historialVentas: any[] = [];
  mesaSeleccionada: string = '';

  constructor(private boletaService: BoletaService, private router: Router) {}

  ngOnInit() {
    this.cargarHistorial();
  }

  cargarHistorial() {
    this.boletaService.obtenerBoletas().subscribe((data) => {
      this.historialVentas = data.map((doc: any) => ({ ...doc }));
    });
  }



  verDetallesBoleta(numeroBoleta: string) {
    if (numeroBoleta) {
      this.router.navigate(['/adm-deta-vent', numeroBoleta]);
    } else {
      console.error('El número de boleta no está definido');
    }
  }
}