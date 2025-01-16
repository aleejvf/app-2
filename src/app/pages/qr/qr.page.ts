import { Component, OnInit } from '@angular/core';
import { MesaService } from '../../services/mesa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
  standalone: false,
})
export class QrPage implements OnInit {
  mesas: any[] = [];
  selectedMesa: number | null = null;

  constructor(private mesaService: MesaService, private router: Router) {}

  ngOnInit() {
    // Obtén todas las mesas al cargar la página
    this.mesaService.getMesas().subscribe((data) => {
      this.mesas = data;
      console.log('Mesas: ', this.mesas);
    });
  }

  // Función para seleccionar una mesa
  selectMesa(mesa: any) {
    this.selectedMesa = mesa.numero;
    console.log('Mesa seleccionada: ', this.selectedMesa);
  }

  // Función para continuar al menú, solo si se ha seleccionado una mesa
  continuar() {
    if (this.selectedMesa !== null) {
      console.log('Mesa seleccionada: ', this.selectedMesa);
      this.router.navigate(['/menu'], {
        queryParams: { mesa: this.selectedMesa }, // Pasamos el número de la mesa a la siguiente página
      });
    } else {
      alert('Por favor, selecciona una mesa antes de continuar.');
    }
  }
}
