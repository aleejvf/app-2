import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ProductService } from '../../services/product.service';
import { ProdDatosService } from '../../services/prod-datos.service'; // Asegúrate de importar el servicio

@Component({
  selector: 'app-adm-edit-prod',
  templateUrl: './adm-edit-prod.page.html',
  styleUrls: ['./adm-edit-prod.page.scss'],
  standalone: false,
})
export class AdmEditProdPage implements OnInit {
  product: any = {}; // Objeto para almacenar los datos del producto
  subCategoryOptions: string[] = []; // Opciones de subcategorías dinámicas
  productId: string; // Variable para almacenar el ID del producto

  constructor(
    private alertController: AlertController,
    private router: Router,
    private productService: ProductService,
    private prodDatosService: ProdDatosService // Inyección del servicio ProdDatosService
  ) {}

  ngOnInit() {
    // Obtén los datos del producto seleccionado del servicio
    this.product = this.productService.getProduct();
    this.productId = this.product.id; // Asigna el ID del producto
    this.updateSubCategories(); // Inicializa las subcategorías basadas en la categoría
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.product.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onCategoryChange() {
    this.updateSubCategories(); // Actualiza las opciones de subcategorías
    this.product.subCategory = ''; // Restablece la subcategoría seleccionada
  }

  updateSubCategories() {
    if (this.product.category === 'bebida') {
      this.subCategoryOptions = ['cafe-caliente', 'cafe-frio', 'te'];
    } else if (this.product.category === 'comida') {
      this.subCategoryOptions = ['dulce', 'preparados'];
    } else {
      this.subCategoryOptions = [];
    }
  }

  async guardarProducto() {
    if (!this.product.title || !this.product.description || !this.product.price || !this.product.category || !this.product.subCategory || !this.product.image) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Todos los campos son obligatorios.',
        buttons: ['OK'],
        backdropDismiss: false,
      });
      await alert.present();
      return;
    }

    try {
      await this.prodDatosService.updateProduct(this.productId, this.product); // Actualiza el producto
      const alert = await this.alertController.create({
        header: 'Confirmación',
        message: 'Producto actualizado correctamente.',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.router.navigate(['/adm-produc']);
            },
          },
        ],
        backdropDismiss: false,
      });
      await alert.present();
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Hubo un problema al actualizar el producto.',
        buttons: ['OK'],
        backdropDismiss: false,
      });
      await alert.present();
    }
  }

  async eliminarProducto() {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas eliminar este producto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Eliminación cancelada');
          },
        },
        {
          text: 'Eliminar',
          handler: async () => {
            try {
              await this.prodDatosService.deleteProduct(this.productId); // Elimina el producto de Firestore
              const alertConfirm = await this.alertController.create({
                header: 'Confirmación',
                message: 'Producto eliminado correctamente.',
                buttons: [
                  {
                    text: 'OK',
                    handler: () => {
                      this.router.navigate(['/adm-produc']); // Redirige a la lista de productos
                    },
                  },
                ],
                backdropDismiss: false,
              });
              await alertConfirm.present();
            } catch (error) {
              const alertError = await this.alertController.create({
                header: 'Error',
                message: 'Hubo un problema al eliminar el producto.',
                buttons: ['OK'],
                backdropDismiss: false,
              });
              await alertError.present();
            }
          },
        },
      ],
    });

    await alert.present();
  }
}
