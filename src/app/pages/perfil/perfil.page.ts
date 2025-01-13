import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone : false
})
export class PerfilPage implements OnInit {
  isAlertOpen = false;
  alertButtons = ['Listo'];

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
  
  constructor() { }

  ngOnInit() {
  }

}
