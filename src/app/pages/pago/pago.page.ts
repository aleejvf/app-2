import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
  standalone : false
})
export class PagoPage implements OnInit {
  isAlertOpen = false;
  alertButtons = ['Listo'];

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
  constructor() { }

  ngOnInit() {
  }

}
