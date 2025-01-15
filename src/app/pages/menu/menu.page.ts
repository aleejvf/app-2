import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: false
})
export class MenuPage implements OnInit {
  isAlertOpen = false;
  alertButtons = ['Listo'];




  ngOnInit() {
    // Configurar los valores predeterminados o cualquier lógica de inicialización si es necesario
  }



  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
}
