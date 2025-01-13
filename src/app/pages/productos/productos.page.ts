import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone : false
})
export class ProductosPage implements OnInit {
  isAlertOpen = false;
  alertButtons = ['Listo'];

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
  constructor() { }

  ngOnInit() {
  }

}
