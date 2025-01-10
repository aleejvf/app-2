import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-prod',
  templateUrl: './detalle-prod.page.html',
  styleUrls: ['./detalle-prod.page.scss'],
  standalone : false
})
export class DetalleProdPage implements OnInit {
  isAlertOpen = false;
  alertButtons = ['Listo'];

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
  
  constructor() { }

  ngOnInit() {
  }

}
