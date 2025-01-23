import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoletaService } from '../../services/boleta.service';

@Component({
  selector: 'app-adm-deta-vent',
  templateUrl: './adm-deta-vent.page.html',
  styleUrls: ['./adm-deta-vent.page.scss'],
  standalone: false,
})
export class AdmDetaVentPage implements OnInit {
  boleta: any;

  constructor(
    private route: ActivatedRoute,
    private boletaService: BoletaService
  ) {}

  ngOnInit() {
    const numeroBoleta = this.route.snapshot.paramMap.get('numeroBoleta'); // Obtiene el numeroBoleta desde la URL
    if (numeroBoleta) {
      this.boletaService.obtenerBoletaPorNumero(numeroBoleta).subscribe((data) => {
        this.boleta = data[0]; // Suponiendo que el resultado es un array de boletas
      });
    }
  }
}
