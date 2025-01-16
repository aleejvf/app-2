import { Component, OnInit } from '@angular/core';
import { MesaService } from '../../services/mesa.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: false,
})
export class MenuPage implements OnInit {
  isAlertOpen = false;
  alertButtons = ['Listo'];
  mesa: number | null = null;

  constructor(private mesaService: MesaService) {}

  ngOnInit() {
    // Obtener la mesa seleccionada desde el servicio
    this.mesa = this.mesaService.getSelectedMesa();
    console.log('Mesa obtenida: ', this.mesa);

    // Configurar los valores predeterminados o cualquier lógica de inicialización adicional
  }

  filtro(algo:string){
 console.log(algo);
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
}
