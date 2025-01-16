import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service'; // Importa el servicio

@Component({
  selector: 'app-adm-pedidos',
  templateUrl: './adm-pedidos.page.html',
  styleUrls: ['./adm-pedidos.page.scss'],
  standalone: false,
})
export class AdmPedidosPage implements OnInit {
  orders: any[] = [];  // Almacena los pedidos

  constructor(private orderService: OrderService) {}

  ngOnInit() {

  }
}
