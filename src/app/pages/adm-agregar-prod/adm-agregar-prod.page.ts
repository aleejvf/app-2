import { Component } from '@angular/core';
import { ProdDatosService } from 'src/app/services/prod-datos.service';

@Component({
  selector: 'app-adm-agregar-prod',
  templateUrl: './adm-agregar-prod.page.html',
  styleUrls: ['./adm-agregar-prod.page.scss'],
  standalone : false
})
export class AdmAgregarProdPage {
  productImage: string = '';
  productTitle: string = '';
  productDescription: string = '';
  productPrice: number | null = null;
  productCategory: string = ''; // Almacena si es bebida o comida
  productSubCategory: string = ''; // Almacena subcategoría (café, té, etc.)

  constructor(private prodDatosService: ProdDatosService) {}

  // Evento para actualizar la categoría
  onCategoryChange(event: any) {
    this.productSubCategory = ''; // Reinicia la subcategoría al cambiar de categoría
  }

  // Método para agregar el producto
  addProduct() {
    if (
      this.productTitle &&
      this.productDescription &&
      this.productPrice !== null &&
      this.productCategory &&
      this.productSubCategory
    ) {
      const newProduct = {
        image: this.productImage || '',
        title: this.productTitle,
        description: this.productDescription,
        price: this.productPrice,
        category: this.productCategory,
        subCategory: this.productSubCategory,
      };

      this.prodDatosService
        .addProduct(newProduct)
        .then(() => {
          alert('Producto agregado correctamente.');
          // Limpia el formulario
          this.productImage = '';
          this.productTitle = '';
          this.productDescription = '';
          this.productPrice = null;
          this.productCategory = '';
          this.productSubCategory = '';
        })
        .catch((error) => {
          console.error('Error al agregar el producto:', error);
        });
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }
}
