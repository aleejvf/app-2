import { Component, OnInit } from '@angular/core';
import { MesaService } from '../../services/mesa.service';
import { BoletaService } from '../../services/boleta.service'; // Importa BoletaService
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Importa AngularFireAuth para obtener el usuario
import { OrderService } from '../../services/order.service'; // Importa OrderService para obtener los productos del pedido

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
  standalone: false,
})
export class QrPage implements OnInit {
  mesas: any[] = [];
  selectedMesa: number | null = null;
  user: any = null; // Para almacenar los datos del usuario
  order: any[] = []; // Para almacenar los productos del pedido

  constructor(
    private mesaService: MesaService, 
    private boletaService: BoletaService, // Inyecta BoletaService
    private router: Router,
    private afAuth: AngularFireAuth, // Inyecta AngularFireAuth para obtener el usuario autenticado
    private orderService: OrderService // Inyecta OrderService para obtener los productos
  ) {}

  ngOnInit() {
    // Obtén todas las mesas al cargar la página
    this.mesaService.getMesas().subscribe((data) => {
      this.mesas = data;
      console.log('Mesas: ', this.mesas);
    });

    // Obtén los datos del usuario autenticado
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        console.log('Usuario autenticado: ', this.user);
      }
    });

    // Obtén los productos del pedido (si es necesario)
    this.order = this.orderService.getOrder();
  }

  // Función para seleccionar una mesa
  selectMesa(mesa: any) {
    this.selectedMesa = mesa.numero;
    console.log('Mesa seleccionada: ', this.selectedMesa);
  }

  // Función para continuar al menú, solo si se ha seleccionado una mesa
  continuar() {
    if (this.selectedMesa !== null && this.user) {
      // Crear objeto de boleta con todos los datos necesarios, pero con los productos en null
      const boleta = {
        usuarioId: this.user.uid, // ID del usuario
        email: this.user.email,    // Email del usuario
        numeroMesa: this.selectedMesa, // Número de mesa seleccionado
        productos: null,  // Establece los productos en null
      };

      // Llamar al servicio para agregar la boleta
      this.boletaService.addBoleta(boleta).then(() => {
        console.log('Boleta agregada con éxito', boleta);
        this.router.navigate(['/menu']);
      }).catch((error) => {
        console.error('Error al agregar la boleta: ', error);
      });
    } else {
      alert('Por favor, selecciona una mesa y asegúrate de estar autenticado.');
    }
  }
}
