import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
  standalone : false
})
export class IndexPage implements OnInit {
  isAlertOpen = false;
  alertButtons = ['Listo'];

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
  
  constructor() { }

  ngOnInit() {
  }

}
