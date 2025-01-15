import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';  // Importa el servicio para obtener el producto

@Component({
  selector: 'app-detalle-prod',
  templateUrl: './detalle-prod.page.html',
  styleUrls: ['./detalle-prod.page.scss'],
  standalone: false,
})
export class DetalleProdPage implements OnInit {
  isAlertOpen = false;
  alertButtons = ['Listo'];

  product: any;  // Variable para almacenar el producto seleccionado

  note: string = '';  // Propiedad para la nota del cliente
  toastMessage: string | null = null;  // Propiedad para el mensaje del toast

  constructor(
    private alertController: AlertController,
    private router: Router,
    private productService: ProductService // Servicio para obtener el producto
  ) {}

  ngOnInit() {
    this.product = this.productService.getProduct(); // Recupera el producto desde el servicio
  }

  // Muestra una alerta que indica que el producto fue agregado pero falta confirmar
  async showAddToOrderAlert() {
    const alert = await this.alertController.create({
      header: 'Producto agregado',
      message: 'Este producto se agregó a tu pedido, pero aún falta que lo confirmes para que se lleve a la cocina.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigateByUrl('/menu'); // Redirigir a la página del menú
          },
        },
      ],
      backdropDismiss: false, // Deshabilita el clic en el fondo
    });

    await alert.present();
  }

  // Método para agregar el producto a la orden
  addToOrder() {
    if (this.note.trim() === '') {
      this.toastMessage = 'No se ha añadido ninguna nota.';
    } else {
      this.toastMessage = 'Producto agregado con éxito.';
    }
    // Aquí puedes añadir la lógica para manejar la adición al carrito o pedido
    console.log('Nota agregada:', this.note);
    setTimeout(() => {
      this.toastMessage = null;
    }, 5000); // Mostrar el toast durante 5 segundos
  }

  // Método para actualizar el estado del toast
  setToastMessage(message: string) {
    this.toastMessage = message;
  }

  // Controla el estado de la alerta
  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
}
